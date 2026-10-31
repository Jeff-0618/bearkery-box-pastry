/**
 * Bearkery — order intake for a Google Sheet.
 *
 * Paste this into Extensions → Apps Script on the Sheet that should hold the
 * orders, then Deploy → New deployment → Web app (Execute as: Me, Who has
 * access: Anyone). Steps in README.md.
 *
 * One row per order LINE ITEM, matching the "Export CSV" button on /admin:
 * the first 18 columns are identical to ORDER_CSV_COLUMNS in
 * lib/order-store.ts, so an existing pandas pipeline reads either source the
 * same way. The extra columns after them carry what the kitchen needs to
 * actually bake the order (cake message, allergies, address).
 */

var SHEET_NAME = 'Orders';
var MAX_ITEMS = 50;
var MAX_TEXT = 500;

var COLUMNS = [
  'order_id', 'placed_at', 'status', 'channel', 'is_demo',
  'customer_name', 'customer_phone', 'customer_email',
  'fulfillment', 'pickup_or_delivery_date',
  'product_name', 'variant', 'quantity',
  'unit_price_myr', 'line_total_myr',
  'order_subtotal_myr', 'order_delivery_fee_myr', 'order_total_myr',
  // --- extra, kitchen-facing ---
  'cake_message', 'recipient_name', 'gift_card_message', 'special_request',
  'customer_address', 'order_notes'
];

function doGet() {
  // Lets you open the /exec URL in a browser to confirm the deployment works.
  return ContentService.createTextOutput('Bearkery order sheet is live.');
}

function doPost(e) {
  try {
    var order = JSON.parse(e.postData.contents);
    validate_(order);

    var lock = LockService.getScriptLock();
    lock.waitLock(15000);
    try {
      var sheet = getSheet_();
      if (alreadyRecorded_(sheet, order.id)) {
        return json_({ ok: true, duplicate: true });
      }
      var rows = toRows_(order);
      sheet
        .getRange(sheet.getLastRow() + 1, 1, rows.length, COLUMNS.length)
        .setValues(rows);
    } finally {
      lock.releaseLock();
    }
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

/** Run once from the editor to create the sheet and header row. */
function setup() {
  getSheet_();
}

// ---------------------------------------------------------------------------

function getSheet_() {
  var book = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = book.getSheetByName(SHEET_NAME) || book.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, COLUMNS.length).setValues([COLUMNS]);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, COLUMNS.length).setFontWeight('bold');
    // Plain text everywhere: phone numbers keep their leading + and zeros.
    sheet.getRange(2, 1, sheet.getMaxRows() - 1, COLUMNS.length).setNumberFormat('@');
  }
  return sheet;
}

function validate_(order) {
  if (!order || typeof order !== 'object') throw new Error('bad payload');
  if (!/^BKB-[A-Z0-9]{5}$/.test(String(order.id))) throw new Error('bad order id');
  if (!Array.isArray(order.items) || order.items.length < 1 || order.items.length > MAX_ITEMS) {
    throw new Error('bad items');
  }
  order.items.forEach(function (item) {
    if (typeof item.quantity !== 'number' || typeof item.unitPrice !== 'number') {
      throw new Error('bad item');
    }
  });
}

function alreadyRecorded_(sheet, orderId) {
  var last = sheet.getLastRow();
  if (last < 2) return false;
  var ids = sheet.getRange(2, 1, last - 1, 1).getValues();
  for (var i = 0; i < ids.length; i++) {
    if (String(ids[i][0]) === String(orderId)) return true;
  }
  return false;
}

function toRows_(order) {
  var customer = order.customer || {};
  var address = [customer.address, customer.city, customer.postalCode]
    .filter(function (part) { return part; })
    .join(', ');

  return order.items.map(function (item) {
    var gift = item.gift || {};
    var variant = item.variant || {};
    return [
      order.id, order.placedAt, order.status, order.channel, order.isDemo,
      customer.fullName, customer.phone, customer.email,
      order.fulfillment, item.deliveryDate,
      item.name, variant.label, item.quantity,
      money_(item.unitPrice), money_(item.unitPrice * item.quantity),
      money_(order.subtotal), money_(order.deliveryFee), money_(order.total),
      gift.cakeMessage, gift.recipientName, gift.giftCardMessage, gift.specialRequest,
      address, customer.notes
    ].map(safe_);
  });
}

function money_(n) {
  return Number(n || 0).toFixed(2);
}

/**
 * Customer-typed text goes into a spreadsheet, where a value starting with
 * = + - @ would be run as a formula (e.g. IMPORTXML sending data elsewhere).
 * A leading apostrophe stores it as plain text instead.
 */
function safe_(value) {
  if (value === null || value === undefined) return '';
  var text = String(value).slice(0, MAX_TEXT);
  return /^[=+\-@\t\r]/.test(text) ? "'" + text : text;
}

function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
