export const AppConfig = {
    'apiBaseUrl': "http://localhost:3000/",
    'defaultCurrency': 'IDR'

}

export const APIUrls = {
    'loginWithFB': 'users/',
    'userList': 'users/',
    "insuranceList": "insurances/",
    "claimList": "claims/"
}

export const PolicyStatus = {
    label: {
        "0": "Payment Pending",
        "1": "Activation Pending",
        "2": "Activated (unable to clain)",
        "3": "Activation Completed",
        "4": "Claimed"
    },
    policyInfo: {
        "0": "Complete payment for activating policy",
        "1": "Activate your policy using mobile",
        "2": "X day(s) to make a claim",
        "3": "Active from X to Y",
        "4": "You have made claim"
    },
    badgeClass: {
        "0": "badge badge-danger",
        "1": "badge badge-warning",
        "2": "badge badge-warning",
        "3": "badge badge-success",
        "4": "badge badge-primary"
    }
}

export const ClaimStatus = {
    label: {
        "0": "Processing",
        "1": "Claim Issued",
        "2": "Claim Rejected"
    },
    badgeClass: {
        "0": "badge badge-warning",
        "1": "badge badge-success",
        "2": "badge badge-danger"
    }
}

export const ClaimReason = [
    { value: 1, label: 'Damage' },
    { value: 2, label: 'Lost' },
]

export const ExactClaimGroupedReason = {
    2: [
        { value: 2, label: 'Theft' },
        { value: 3, label: 'Burglary' },
        { value: 4, label: 'Robbery' },
    ],
    1: [
        { value: 1, label: 'Accidental Damage' },
        { value: 5, label: 'Liquid Damage' },
    ]
}

export const ClaimLabels = {
    2: 'Theft',
    3: 'Burglary',
    4: 'Robbery',
    1: 'Accidental Damage',
    5: 'Liquid Damage'
}