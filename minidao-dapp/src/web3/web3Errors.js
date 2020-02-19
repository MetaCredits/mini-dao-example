class Web3Error extends Error {
    constructor(type = "web3Error", ...params) {
        // Pass remaining arguments (including vendor specific ones) to parent constructor
        super(...params)

        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, Web3Error)
        }

        this.name = 'Web3Error'
        // Custom debugging information
        this.type = type
    }
}

export default Web3Error