// Test script to verify ICU support in Node.js binary
// Usage: node test-icu.js

console.log('=== Node.js ICU Verification ===');
console.log('Node version:', process.version);
console.log('V8 version:', process.versions.v8);
console.log('ICU version:', process.versions.icu);
console.log('Architecture:', process.arch);
console.log('Platform:', process.platform);
console.log('');

// Check if ICU is available
if (!process.versions.icu) {
  console.error('❌ ERROR: ICU is not available!');
  console.error('   process.versions.icu is undefined');
  process.exit(1);
}

console.log('✅ ICU support detected: version', process.versions.icu);
console.log('');

// Test Unicode property escapes (requires ICU)
const tests = [
  { name: 'Basic Unicode property', pattern: /\p{L}+/u },
  { name: '$ in character class', pattern: /[a-z$]+/u },
  { name: '$ with Unicode props', pattern: /[\p{L}$]+/u },
  {
    name: 'Full pattern',
    pattern:
      /^[\p{L}\p{Nl}$\p{Mn}\p{Mc}\p{Nd}\p{Pc}.]+ is not a function[ \w]*$/u,
  },
];

console.log('=== Unicode Property Tests ===');
let failures = 0;

for (const { name, pattern } of tests) {
  try {
    'test'.match(pattern);
    console.log(`✅ ${name}: OK`);
  } catch (e) {
    console.log(`❌ ${name}: FAILED - ${e.message}`);
    failures++;
  }
}

console.log('');

if (failures > 0) {
  console.error(`❌ ${failures} test(s) failed`);
  process.exit(1);
}

console.log('✅ All ICU verification tests passed!');
process.exit(0);
