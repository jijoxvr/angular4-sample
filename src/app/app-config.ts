export const AppConfig = {
    'apiBaseUrl' : "http://localhost:3000/",
    'defaultCurrency' : 'IDR'
    
}

export const APIUrls = {
    'userList' : 'users/',
    "insuranceList": "insurances/"
}

export const PolicyStatus = {
    label : {
        "0" : "Payment Pending",
        "1" : "Activation Pending",
        "2" : "Activated (unable to clain)",
        "3" : "Activation Completed",
        "4" : "Claimed"
    },
    policyInfo : {
        "0" : "Complete payment for activating policy",
        "1" : "Activate your policy using mobile",
        "2" : "X day(s) to make a claim",
        "3" : "Active from X to Y",
        "4" : "You have made claim"
    },
    badgeClass : {
        "0" : "badge badge-danger",
        "1" : "badge badge-warning",
        "2" : "badge badge-warning",
        "3" : "badge badge-success",
        "4" : "badge badge-primary"
    }
}