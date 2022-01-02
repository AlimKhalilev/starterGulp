export const appState = {
    isBuild: process.argv.includes("--build"),
    isDev: !process.argv.includes("--build")
}