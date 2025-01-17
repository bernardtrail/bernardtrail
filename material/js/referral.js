// Initialize when document is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeReferralSystem();
    updateReferralStats();
});

// Generate or get unique referral code for user
function generateReferralCode() {
    let referralCode = localStorage.getItem('referralCode');
    if (!referralCode) {
        // Generate a unique code combining timestamp and random string
        referralCode = 'BNC' + Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
        localStorage.setItem('referralCode', referralCode);
    }
    return referralCode;
}

// Initialize referral system
function initializeReferralSystem() {
    // Generate referral link
    const referralCode = generateReferralCode();
    const referralLink = `${window.location.origin}/index.html?ref=${referralCode}`;
    
    // Update referral link in input field
    const linkInput = document.getElementById('referralLink');
    if (linkInput) {
        linkInput.value = referralLink;
    }

    // Check if user came from a referral
    const urlParams = new URLSearchParams(window.location.search);
    const referrerCode = urlParams.get('ref');
    
    if (referrerCode && !localStorage.getItem('wasReferred')) {
        handleNewReferral(referrerCode);
    }
}

// Handle new referral
function handleNewReferral(referrerCode) {
    localStorage.setItem('referrerCode', referrerCode);
    localStorage.setItem('wasReferred', 'true');
    addReferralBonus(referrerCode);
}

// Add bonus for successful referral
function addReferralBonus(referrerCode) {
    const referralBonus = 1000; // 1000 BNC bonus
    const currentBalance = parseInt(localStorage.getItem('balance')) || 0;
    localStorage.setItem('balance', currentBalance + referralBonus);
    
    // Track this referral
    let referredUsers = JSON.parse(localStorage.getItem('referredUsers')) || [];
    referredUsers.push({
        date: new Date().toISOString(),
        code: referrerCode,
        bonus: referralBonus
    });
    localStorage.setItem('referredUsers', JSON.stringify(referredUsers));
}

// Update referral statistics display
function updateReferralStats() {
    const referredUsers = JSON.parse(localStorage.getItem('referredUsers')) || [];
    const referralCount = document.getElementById('referralCount');
    const totalEarned = document.getElementById('totalEarned');
    
    if (referralCount && totalEarned) {
        referralCount.textContent = referredUsers.length;
        totalEarned.textContent = referredUsers.length * 1000;
    }
}

// Copy referral link to clipboard
function copyReferralLink() {
    const linkInput = document.getElementById('referralLink');
    linkInput.select();
    document.execCommand('copy');
    
    // Show toast notification
    const toast = document.getElementById('toast');
    toast.classList.add('show');
    
    // Update button text
    const copyButton = document.getElementById('copyButton');
    copyButton.textContent = 'Copied!';
    
    // Reset after 2 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        copyButton.textContent = 'Copy Link';
    }, 2000);
}
