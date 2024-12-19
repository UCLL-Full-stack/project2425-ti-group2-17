/** @type {import('ts-jest').JestConfigWithTsJest} **/
// module.exports = {
//   testEnvironment: "node",
//   transform: {
//     "^.+.tsx?$": ["ts-jest",{}],
//   },
// };
module.exports = {
    testEnvironment: 'jsdom',
    transform: {
        '\\.[jt]sx?$': 'esbuild-jest',
    },
};
