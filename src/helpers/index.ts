function generateOtp(numberOfDigits: number = 6): string {
  const otp = Math.floor(
    Math.pow(10, numberOfDigits - 1) +
      Math.random() *
        (Math.pow(10, numberOfDigits) - Math.pow(10, numberOfDigits - 1)),
  );

  return otp.toString().padStart(numberOfDigits, '0');
}
