import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-case-details',
  templateUrl: './case-details.component.html',
  styleUrls: ['./case-details.component.css']
})

export class CaseDetailsComponent implements OnInit {

  caseId = parseInt(this.route.snapshot.params['id']);
  caseDetails: any;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    console.log(this.caseId);
    this.caseDetails = CASE_DETAILS;
  }

  scrollToElement(location: string ): void {
    const element = document.querySelector(location)
    if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}


const CASE_DETAILS = {
  "Id": "1",
  "Provider": [
    {
      "ID": {
        "value": " GT|Reliable",
        "type": "appfac"
      },
      "Name": "",
      "Phone": "",
      "Fax": "",
      "Email": "",
      "Facility": "",
      "Address": "",
      "Country": ""
    },
    {
      "ID": {
        "value": "P49430",
        "type": "ORDPROVIDER"
      },
      "Name": "D ATKINSON",
      "Phone": "",
      "Fax": "",
      "Email": "",
      "Facility": "",
      "Address": "",
      "Country": ""
    },
    {
      "ID": {
        "value": "P49430",
        "type": "ORDPROVIDER"
      },
      "Name": "John Duke",
      "Phone": "",
      "Fax": "",
      "Email": "",
      "Facility": "",
      "Address": "",
      "Country": ""
    }
  ],
  "Facility": {
    "ID": null,
    "Name": "",
    "Phone": "",
    "Address": "",
    "Fax": "",
    "Hospital_Unit": ""
  },
  "Patient": {
    "ID": [
      {
        "value": "82713",
        "type": "urn:hssc:musc:patientid"
      },
      {
        "value": "777333333",
        "type": "SS"
      },
      {
        "value": "",
        "type": ""
      }
    ],
    "Name": {
      "given": "RODRICK",
      "family": "HEMAUER"
    },
    "Parents_Guardians": [],
    "Street_Address": "2222 Home Street, Ann Arbor MI 99999",
    "Birth_Date": "19750602",
    "Sex": "male",
    "PatientClass": "",
    "Race": {
      "Code": "",
      "System": "",
      "Display": ""
    },
    "Ethnicity": {
      "Code": "",
      "System": "",
      "Display": ""
    },
    "Preferred_Language": {
      "Code": "",
      "System": "",
      "Display": ""
    },
    "Occupation": "TBD",
    "Pregnant": false,
    "Travel_History": [
      "TBD"
    ],
    "Insurance_Type": {
      "Code": "",
      "System": "",
      "Display": ""
    },
    "Immunization_History": [],
    "Visit_DateTime": "Thu Mar 27 00:00:00 UTC 2200",
    "Admission_DateTime": "Thu Mar 27 00:00:00 UTC 2200",
    "Date_Of_Onset": "",
    "Symptoms": [
      {
        "Code": "105629000",
        "System": "SNOMED CT",
        "Display": "Chlamydial infection"
      }
    ],
    "Lab_Order_Code": [
      {
        "Code": "164200",
        "System": "L",
        "Display": "C. trachomatis - PCA",
        "Date": "20050429170100",
        "Laboratory_Results": [
          {
            "Code": "164200",
            "System": "L",
            "Display": "C. trachomatis - PCA",
            "Date": "200505031532",
            "Value": "Positive",
            "Unit": {
              "Code": "",
              "System": "",
              "Display": ""
            }
          }
        ],
        "Facility": {
          "ID": null,
          "Name": "",
          "Phone": "",
          "Address": "",
          "Fax": "",
          "Hospital_Unit": ""
        },
        "Provider": {
          "ID": {
            "value": "P49430",
            "type": "ORDPROVIDER"
          },
          "Name": "D ATKINSON",
          "Phone": "",
          "Fax": "",
          "Email": "",
          "Facility": "",
          "Address": "",
          "Country": ""
        }
      },
      {
        "Code": "164205",
        "System": "L",
        "Display": "N gonorrhoeae Competition Rflx",
        "Date": "20050429170100",
        "Laboratory_Results": [
          {
            "Code": "164205",
            "System": "L",
            "Display": "N gonorrhoeae Competition Rflx",
            "Date": "20050429170100",
            "Value": "Negative",
            "Unit": {
              "Code": "",
              "System": "",
              "Display": ""
            }
          },
          {
            "Code": "164212",
            "System": "L",
            "Display": "N gonorrhoeae DNA Probe w/Rflx",
            "Date": "20050429170100",
            "Value": "See Reflex",
            "Unit": {
              "Code": "",
              "System": "",
              "Display": ""
            }
          }
        ],
        "Facility": {
          "ID": null,
          "Name": "",
          "Phone": "",
          "Address": "",
          "Fax": "",
          "Hospital_Unit": ""
        },
        "Provider": {
          "ID": {
            "value": "P49430",
            "type": "ORDPROVIDER"
          },
          "Name": "John Duke",
          "Phone": "",
          "Fax": "",
          "Email": "",
          "Facility": "",
          "Address": "",
          "Country": ""
        }
      }
    ],
    "Placer_Order_Code": "",
    "Diagnosis": [
      {
        "Code": "105629000",
        "System": "http://snomed.info/sct",
        "Display": "Chlamydial infection",
        "Date": "Thu Mar 27 00:00:00 UTC 2200"
      }
    ],
    "Medication Provided": [
      {
        "Code": "141962",
        "System": "RxNorm",
        "Display": "Azithromycin 250 MG Oral Capsule",
        "Dosage": {
          "Value": "",
          "Unit": ""
        },
        "Date": "Mar 27, 2200 12:00:00 AM",
        "Frequency": ""
      },
      {
        "Code": "1665497",
        "System": "RxNorm",
        "Display": "50 ML Levofloxacin 5 MG/ML Injection",
        "Dosage": {
          "Value": "",
          "Unit": ""
        },
        "Date": "Mar 27, 2200 12:00:00 AM",
        "Frequency": ""
      },
      {
        "Code": "1423080",
        "System": "RxNorm",
        "Display": "doxycycline hyclate 200 MG Delayed Release Oral Tablet",
        "Dosage": {
          "Value": "",
          "Unit": ""
        },
        "Date": "Mar 27, 2200 12:00:00 AM",
        "Frequency": ""
      }
    ],
    "Death_Date": "",
    "Date_Discharged": "Thu Apr 03 00:00:00 UTC 2200",
    "Laboratory_Results": [],
    "Trigger_Code": [],
    "Lab_Tests_Performed": []
  },
  "Sending Application": "GT 1234 CLIA",
  "Notes": []
};
