const ARABIC_INDIC_ZERO = 0x0660;
const EXTENDED_ARABIC_ZERO = 0x06f0;

function normalizeDigits(input: string): string {
  let out = '';
  for (const ch of input.trim()) {
    const code = ch.charCodeAt(0);
    if (code >= ARABIC_INDIC_ZERO && code <= ARABIC_INDIC_ZERO + 9) {
      out += String(code - ARABIC_INDIC_ZERO);
    } else if (code >= EXTENDED_ARABIC_ZERO && code <= EXTENDED_ARABIC_ZERO + 9) {
      out += String(code - EXTENDED_ARABIC_ZERO);
    } else {
      out += ch;
    }
  }
  return out;
}

/** Normalizes Egyptian/international phone inputs into canonical E.164 (e.g. +201012345678). */
export function normalizePhoneNumber(raw: string): string {
  const ascii = normalizeDigits(raw).replace(/[\s\-().]/g, '');
  let candidate = ascii;

  if (candidate.startsWith('00')) {
    candidate = `+${candidate.slice(2)}`;
  } else if (/^01[0125]\d{8}$/.test(candidate)) {
    candidate = `+2${candidate}`;
  } else if (/^201[0125]\d{8}$/.test(candidate)) {
    candidate = `+${candidate}`;
  } else if (/^1[0125]\d{8}$/.test(candidate)) {
    candidate = `+20${candidate}`;
  }

  if (!/^\+[1-9]\d{7,14}$/.test(candidate)) {
    throw new Error('رقم الهاتف غير صالح. يرجى إدخال رقم هاتف صحيح.');
  }
  return candidate;
}

export function isValidPhoneNumber(raw: string): boolean {
  try {
    normalizePhoneNumber(raw);
    return true;
  } catch {
    return false;
  }
}

export const SYNTHETIC_PHONE_DOMAIN = '@phone.tazaj.eg';

/** Deterministic Auth email alias so phone + password works on Spark without SMS OTP. */
export function phoneToAuthEmail(rawPhone: string): string {
  const normalized = normalizePhoneNumber(rawPhone);
  return `${normalized.slice(1)}${SYNTHETIC_PHONE_DOMAIN}`;
}

export function sanitizePublicEmail(email: string | null | undefined): string {
  if (!email) return '';
  const trimmed = email.trim();
  if (!trimmed || trimmed.toLowerCase().endsWith(SYNTHETIC_PHONE_DOMAIN)) {
    return '';
  }
  return trimmed;
}
