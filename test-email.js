// Test script for email functionality
// Run with: node test-email.js

const { sendContactEmail, sendReservationEmail, sendNewsletterEmail } = require("./utils/email-sender.js")

async function testEmailFunctions() {
  console.log("🧪 Testing email functions...\n")

  // Test 1: Contact Email
  console.log("📧 Testing contact email...")
  try {
    const contactResult = await sendContactEmail({
      firstName: "Test",
      lastName: "User",
      email: "test@example.com",
      phone: "12345678",
      unitType: "Appartement S+1",
      message: "This is a test message for contact form.",
    })
    console.log("✅ Contact email test passed:", contactResult)
  } catch (error) {
    console.log("❌ Contact email test failed:", error.message)
  }

  console.log("")

  // Test 2: Reservation Email
  console.log("🏠 Testing reservation email...")
  try {
    const reservationResult = await sendReservationEmail({
      firstName: "Test",
      lastName: "Buyer",
      email: "buyer@example.com",
      phone: "87654321",
      unitType: "Duplex Premium",
      message: "This is a test reservation message.",
    })
    console.log("✅ Reservation email test passed:", reservationResult)
  } catch (error) {
    console.log("❌ Reservation email test failed:", error.message)
  }

  console.log("")

  // Test 3: Newsletter Email
  console.log("📰 Testing newsletter email...")
  try {
    const newsletterResult = await sendNewsletterEmail("newsletter@example.com")
    console.log("✅ Newsletter email test passed:", newsletterResult)
  } catch (error) {
    console.log("❌ Newsletter email test failed:", error.message)
  }

  console.log("\n🎉 Email testing completed!")
}

// Performance test
async function performanceTest() {
  console.log("\n⚡ Running performance test...")
  const startTime = Date.now()

  const promises = [
    sendContactEmail({
      firstName: "Perf",
      lastName: "Test1",
      email: "perf1@example.com",
      phone: "11111111",
      message: "Performance test 1",
    }),
    sendContactEmail({
      firstName: "Perf",
      lastName: "Test2",
      email: "perf2@example.com",
      phone: "22222222",
      message: "Performance test 2",
    }),
    sendContactEmail({
      firstName: "Perf",
      lastName: "Test3",
      email: "perf3@example.com",
      phone: "33333333",
      message: "Performance test 3",
    }),
  ]

  try {
    await Promise.all(promises)
    const endTime = Date.now()
    console.log(`✅ Performance test completed in ${endTime - startTime}ms`)
  } catch (error) {
    console.log("❌ Performance test failed:", error.message)
  }
}

// Error handling test
async function errorHandlingTest() {
  console.log("\n🚨 Testing error handling...")

  try {
    await sendContactEmail({
      // Missing required fields to trigger error
      firstName: "",
      lastName: "",
      email: "invalid-email",
      phone: "",
      message: "",
    })
    console.log("❌ Error handling test failed - should have thrown an error")
  } catch (error) {
    console.log("✅ Error handling test passed - correctly caught error:", error.message)
  }
}

// Run all tests
async function runAllTests() {
  await testEmailFunctions()
  await performanceTest()
  await errorHandlingTest()
}

// Execute tests if this file is run directly
if (require.main === module) {
  runAllTests().catch(console.error)
}

module.exports = {
  testEmailFunctions,
  performanceTest,
  errorHandlingTest,
  runAllTests,
}
