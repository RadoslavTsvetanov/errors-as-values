import { ClassicalEither, Either, LeftInstance, LeftRight, LeftRightWithMemory, RightInstance } from "../rust-like-pattern/leftRight";
function getAdmin(username) {
    if (username.length === 3) {
        return new LeftRightWithMemory({ isAdmin: true }, { key: "" }, (v) => v.isAdmin === true);
    }
    return new LeftRightWithMemory({ isAdmin: false }, { key: "" }, (v) => v.isAdmin === true);
}
async function validateUser(username) {
    const res = await getAdmin(username).handleLeft(async (v) => {
        // ... 
    });
    res.handleRight(async (v) => {
        // ...
    });
}
validateUser("use"); // only prints "admin logged in"
validateUser("i"); // only prints "regular user logged in"
async function handleAuthenticationResponse() {
    // Simulate API authentication response
    const authResponse = new LeftRight({ code: 401, message: "Invalid credentials" }, { id: "123", name: "John Doe", email: "john@example.com" });
    // Handle both success and error cases
    await authResponse
        .handleLeft(async (error) => {
        // Log the error and show user-friendly message
        console.error(`Authentication failed: ${error.code}`);
        showUserMessage(`Login failed: ${error.message}`);
    }).then((v) => {
        v.handleRight(async (userData) => {
            // Store user session and redirect
            await sessionStorage.setItem('user', JSON.stringify(userData));
            redirectToDashboard();
        });
    });
}
async function processPayment(amount) {
    // Simulate payment processing
    const isPaymentSuccessful = amount > 0 && Math.random() > 0.5;
    const paymentResult = new Either({
        errorCode: "INSUFFICIENT_FUNDS",
        reason: "Not enough balance",
        retriable: true
    }, {
        transactionId: "tx_" + Math.random().toString(36),
        amount: amount,
        timestamp: new Date()
    }, () => !isPaymentSuccessful);
    await paymentResult
        .handleLeft(async (failure) => {
        if (failure.retriable) {
            await scheduleRetry(amount);
        }
        await notifyUserOfFailure(failure.reason);
    }).then((v) => {
        v.handleRight(async (success) => {
            await sendReceiptEmail(success);
            await updateOrderStatus(success.transactionId);
        });
    });
}
async function handleFileUpload(file) {
    const isUploadComplete = (progress) => progress.percentage === 100;
    const uploadTracker = new LeftRightWithMemory({
        bytesUploaded: 0,
        totalBytes: file.size,
        percentage: 0
    }, {
        fileUrl: "https://example.com/files/uploaded.pdf",
        fileSize: file.size,
        mimeType: file.type
    }, isUploadComplete);
    // Update progress bar while uploading
    await uploadTracker.handleLeft(async (progress) => {
        updateProgressBar(progress.percentage);
        if (progress.percentage < 100) {
            // Simulate chunk upload
            await uploadNextChunk(file);
        }
    });
    // Handle successful upload
    await uploadTracker.handleRight(async (success) => {
        await updateFileLibrary(success.fileUrl);
        showSuccessMessage(`File uploaded successfully: ${success.fileUrl}`);
    });
}
// Helper functions (implementation details omitted for brevity)
function showUserMessage(message) { }
function redirectToDashboard() { }
function scheduleRetry(amount) { }
function notifyUserOfFailure(reason) { }
function sendReceiptEmail(success) { }
function updateOrderStatus(transactionId) { }
function updateProgressBar(percentage) { }
function uploadNextChunk(file) { }
function updateFileLibrary(fileUrl) { }
function showSuccessMessage(message) { }
function getUser(username) {
    if (username.length === 4) {
        return new ClassicalEither(new LeftInstance({ years_in_the_company: 5, base_salary: 1000 }));
    }
    return new ClassicalEither(new RightInstance({ base_salary: 1000 }));
}
function PaySalary(username) {
    const user = getUser(username);
    user.handleLeft(async (v) => {
        // console.log("paying salary of",(v.base_salary * 2.5 * v.years_in_the_company).toString())
    }).handleRight(async (v) => {
        // console.log("paying salary of",(v.base_salary * 1.5))
    });
}
PaySalary("john");
PaySalary("popopo");
class AdminOrNormalUser extends Either {
    constructor(v) {
        super(v, v, () => {
            if (v.adminPhoto.length === 5) {
                return true;
            }
            return false;
        });
    }
}
function processUser(user) {
    user.handleLeft(async (v) => {
        // console.log("admin user:", v.adminPhoto)
    }).then(v => {
        v.handleRight(async (v) => {
            // console.log("normal user")
        });
    });
}
processUser(new AdminOrNormalUser({ adminPhoto: "hhhh" }));
processUser(new AdminOrNormalUser({ adminPhoto: "hhh" }));
//# sourceMappingURL=leftRight.js.map