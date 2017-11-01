export const AppConfig = { 
    'apiBaseUrl': "https://www.octerine.com/api/", // modify this to change API base url
    // 'apiBaseUrl': "http://localhost:3000/", // modify this to change API base url
    'defaultCurrency': 'IDR' // modify this to change currency

}

export const APIUrls = { // modify this only when service URL changes
    'loginWithFB': 'user/',
    'updateProfile': 'updateuser/',
    'userList': 'users/',
    "insuranceList": "insurances/",
    "claimList": "claims/",
    "addnewClaim": "claims/"
}

export const PolicyStatus = { 
    label: { // modify this for changing laguage
        "0": "Payment Pending",
        "1": "Activation Pending",
        "2": "Activated",
        "3": "Activated",
        "4": "Claimed"
    },
    policyInfo: { // modify this for changing laguage
        "0": "Complete payment for activating policy",
        "1": "Please, Activate your policy using mobile",
        "2": "You have to wait X day(s) to make a claim",
        "3": "From X to Y",
        "4": "You have made claim"
    },
    badgeClass: { // should not modiy this
        "0": "badge badge-danger",
        "1": "badge badge-warning",
        "2": "badge badge-warning",
        "3": "badge badge-success",
        "4": "badge badge-primary"
    }
}

export const ClaimStatus = {
    label: { // modify this for changing laguage
        "0": "Processing",
        "1": "Claim Issued",
        "2": "Claim Rejected"
    },
    badgeClass: { // should not modiy this
        "0": "badge badge-warning",
        "1": "badge badge-success",
        "2": "badge badge-danger"
    }
}

export const ClaimReason = [ // modify this for changing laguage
    { value: 1, label: 'Damage' },
    { value: 2, label: 'Lost' },
]

export const ExactClaimGroupedReason = {
    2: [ // modify this for changing laguage
        { value: 2, label: 'Theft' },
        { value: 3, label: 'Burglary' },
        { value: 4, label: 'Robbery' },
    ],
    1: [ // modify this for changing laguage
        { value: 1, label: 'Accidental Damage' },
        { value: 5, label: 'Liquid Damage' },
    ]
}

export const ClaimLabels = { // modify this for changing laguage
    2: 'Theft',
    3: 'Burglary',
    4: 'Robbery',
    1: 'Accidental Damage',
    5: 'Liquid Damage'
}

export const AppLabels = { // modify this for changing laguage


    'appName': 'Insureturn',

    'buttonToCancelPolicy': 'Cancel',
    'buttonToMakePayment' : 'Make Payment',
    'buttonToViewPolicyDetails': 'View Policy Details',
    'buttonToGenerateActvLink':  'Generate Activation Link',
    'buttonToViewClaims': "View Claim Details",
    'buttonToMakeClaim': "Make Claim",
    'buttonToEditProfile': 'Edit Profile',

    'logoutButton': 'Logout',
    'fullScreenButton' : 'fullscreen',

    'profileField': {
        'email' : 'Email',
        'location': 'Location',
        'birthDay': 'Birthday',
        'firstName': 'First Name',
        'lastName': 'Last Name',
        'middleName': 'Middle Name',
        'phoneNumber': 'Phone Number',
        'passportId': 'PassPort Number',
        'ktp': 'KTP',
    },

    'confirmationText': 'Are you sure ?',
    
    'claimConfirmTexts': {
        'title' : 'You will be asked to submit following details',
        'idProof' : 'Copy of ID Card (KTP. SIM, Passport, KITAS)',
        'invoice' : 'Original Proof of Ownership',
        'fir': 'For lost: an original police report letter',
        'expenseReciept': `Official and original receipts for the costs of repair from 
                            authorized service center or replacement together with any 
                            report detailing required repairs`,
        'videoDoc': `Video documentation which explaining the chronology with true
                    statement (Make sure your webcame is working properly)`,
        'devicePhotos' : 'Photograph of damaged unit from all side angles',
        'entityPhotos' : 'Photograph of damaged (forced entry) home or car',
        'hospitalReport' : `Proof of medical record summary from Hospital for Bodily
                             Injury (loss due to robbery benefit)`,

        'confirmButton' : 'Proceed',
        'declineButton' : 'Not Now'
    
    },

    'makeClaim': {
        'title' : 'Please complete all four steps',
        'warningForRequiredField' : 'This field is required',
        'warningForRequiredDocuments' : 'Please select a file',
        'warningForFileSize' : 'The total size must not exceed X (Y)',
        'warningForInvalidFile' : 'Invalid file, suported formats are X',
        'nextButton': 'Next',
        'backButton' : 'Back',
        'step1' : {
            'title' : 'What happened ?',
            'referenceNumber' : 'Reference No',
            'reasonForClaim' : 'Reason for claim',
            'preciseReason' : 'Precise Reason' 
        },
        'step2' : {
            'title' : 'Upload supporting documents',
        },
        'step3' : {
            'title' : `Explain what happens`,
            
        },
        'step4' : {
            'title' : 'Confirm and submit',
            'submitButton' : 'Submit Claim',
            'videoUploadProgressLabel' : 'Uploading Video Document'
        }
    },

    'commonLabels' : {
        'uploading' : 'Uploading',
        'idProof' : 'Id proof',
        'invoice' : 'Invoice',
        'fir' : 'Police report',
        'expenseReciept' : 'Repair/Replace invoice',
        'hospitalReport': 'Medical report',
        'devicePhotos': 'Device photos',
        'entityPhotos': 'Entity photos',
        'video' : 'Video doc',
        'uploadCompleted': 'Completed',
        'claimReason' : 'Reason for claim',
        'documentsSubmited': 'Documents Submitted',
        'noRecords': 'No Record Available',
        'warningForRequiredField' : 'This field is required',
        'warningForRequiredDocuments' : 'Please select a file',
        'warningForFileSize' : 'The total size must not exceed X (Y)',
        'warningForInvalidFile' : 'Invalid file, suported formats are X',
        'warninForInvalidEmail': 'Please enter a valid email address',
        'submitButton' : 'Submit',
        'cancelButton' : 'Cancel'

    },

    'userMenu' : {
        'home': 'Home',
        'claim': 'Claims',
        'profile': 'Profile'
    },

    'labelForPolicyStatus': {
        'paymementPending' : '',
    }
}