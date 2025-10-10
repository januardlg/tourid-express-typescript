
export default {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        useESM: true
      }
    ]
  },
  extensionsToTreatAsEsm: ['.ts'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  testMatch: [
    '**/__tests__/**/*.test.ts',
    '**/?(*.)+(spec|test).ts'
  ],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1'   // 👈 penting: biar Jest gak nyari .js waktu di-import TS
  },
  globals: {
    'ts-jest': {
      useESM: true
    }
  },

  //cover all src functions
  // collectCoverage: true,
  // collectCoverageFrom: [
  //   'src/**/*.{ts,tsx}',   // semua file TS di src
  //   '!src/**/*.d.ts',      // kecualikan file type definition
  //   '!src/**/index.ts',    // optional: kadang file index tidak perlu coverage
  // ],
  // coverageDirectory: 'coverage',
};

