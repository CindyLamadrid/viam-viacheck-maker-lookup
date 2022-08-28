# Risk steps and scan check

This is a component to scan check for review checks

## Installation

```bash
npm i -S -E @viamericas\viam-viacheck-risk-scan
```

> Please review [webpack.config.js](webpack.config.js) on `externals` property to check what packages need to install separately because they are not included in the package.

## Usage

Import package

```js
import Risk from '@viamericas\viam-viacheck-risk-scan';
```

Add the component.

```html
<Risk token="<access_token onHandleScannerEvents={onHandleScannerEvents}
icons={{ scannerIcon, customerIcon, securityIcon, tipsIcon, searhCustomerBar,
riskManagement }} language='es' treasuryUrl="https://tcvs.fiscal.treasury.gov/"
trainingUrl="https://s3.amazonaws.com/viacheck.applications/risk"
ocrUrl="https://applications.viamericas.io/OCRWebApiXEV2/api/Check"
scannerChecks={scannerChecks} onHandleCheck={onHandleCheck}
onShowLoading={onShowLoading} isScanning={false} onCleanImages={() => {}} >
```

>

## Language

```json
const { t } = useTranslation('translation');
```

Translation file structure for error message on rest request:

```json
{
  "blockedList": {
    "select": "Select",
    "account": "Account",
    "routing": "Routing",
    "reason": "Reason",
    "notes": "Notes",
    "accountMin": "Account Min",
    "accountMax": "Account Max",
    "agent": "Agent",
    "registrationDate": "Registration Date",
    "inactivationDate": "Inactivation Date",
    "inactive": "Inactive",
    "review": "Review",
    "definitive": "Definitive",
    "edit": "Edit",
    "export": "Export",
    "titlePopup": "Blocked List",
    "new": "New",
    "success": "The changes were saved succefully.",
    "networkMessage": "Error 410: We cannot communicate with the server, make sure you are connected to the Internet and please try again.",
    "errorOperation": "An error occurred in the process. Please try again.",
    "withOutResult": "We did not find anything with that search criteria. Please change the search criteria and try again.",
    "delete": "Delete",
    "successRemove": "The account(s) were remove successfully"
  },
  "blocklistFilters": {
    "dateFrom": "Date From",
    "dateTo": "Date to",
    "msgWithOutFromDate": "A date is required for the from date. Please enter a from date.",
    "msgWithOutToDate": "A date is required for the end date. Please enter an end date.",
    "msgToDateGreaterCurrentDate": "The end date cannot be higher than today's date. Please correct the end date",
    "msgFromGreaterToDate": "The from date cannot be higher than the end date. Please correct the from date.",
    "msgInvalidRangeDates": "Difference between dates can't be greater than 1 year. Please review the date fields.",
    "account": "Account",
    "accountPlaceholder": "Input Account",
    "routing": "Routing",
    "routingPlaceholder": "Input Routing",
    "blockStatus": "Status",
    "blockStatusPlaceholder": "Select Status",
    "keywords": "Keywords",
    "keywordsPlaceholder": "Select Keywords",
    "reasons": "Reasons",
    "reasonsPlaceholder": "Select Reasons",
    "searchButton": "Search"
  },
  "blockStatus": {
    "BLOCK_STATUS_INACTIVE": "Inactive",
    "BLOCK_STATUS_REVIEW": "Review",
    "BLOCK_STATUS_DEFINITIVE": "Definitive"
  },
  "blocklistForm": {
    "account": "Account",
    "accountPlaceholder": "Input Account",
    "routing": "Routing",
    "routingPlaceholder": "Input Routing",
    "reasons": "Reason",
    "reasonsPlaceholder": "Select Reason",
    "notes": "Notes",
    "notesPlaceholder": "Input Notes",
    "accountMin": "Account Min",
    "accountMinPlaceholder": "Input Account Min",
    "accountMax": "Account Max",
    "accountMaxPlaceholder": "Input Account Max",
    "agency": "Agency",
    "agencyPlaceholder": "Select Agency",
    "isInactive": "Inactive",
    "isReview": "Review",
    "isDefinitive": "Definitive",
    "saveButton": "Save",
    "cancelButton": "Cancel"
  },
  "blocklistError": {
    "fieldRequired": "This field is required",
    "lengthRouting": "The routing shall be 9 digits. Please correct the value",
    "accountRange": "The min value cannot be higher than max value. Please correct values"
  }
}
```

> Check `dev-test/locales` folder for an example.

## Styles

This component have three custom styles.

```javascript
  ux: {
    body: 'notification-document_body',
    row: 'notification-document_row',
    element: 'notification-document_element'
  }
```

> Check `src/styles` folder for an example.

---

## Developer

Hi! It's a guide where you going to can know how packaging project React, build and publish in a repository npm.

## Structure directory

| Path             | Description                                                                          |
| ---------------- | ------------------------------------------------------------------------------------ |
| `__test__`       | Contain the logic of the files of testings                                           |
| `build`          | This folder contains the transpiled code. It is auto-generated by the build command. |
| `coverage`       | This folder contains the code coverage. It is auto-generated by the command.         |
| `dev-test`       | This folder contains the development environment.                                    |
| `doc`            | Contains the project's documentation like user story, user case and diagrames.       |
| `node_modules`   | These directory is generated automatic by use 'npm install'.                         |
| `src`            | Contain your logic of application/component.                                         |
| `src/assets`     | Contain your resources like images, fonts...                                         |
| `src/core/*`     | Contain your all rules business.                                                     |
| `src/core/utils` | They are the files trasversal to the logic.                                          |
| `src/index.js`   | It's application's start                                                             |
| `utils`          | Development utilities                                                                |

## How to publish the project

Follow the steps below:

- `npm login`
- `npm build`
- `npm publish` or `npm publish --scope=<organization_name>`
- `npm unpublish --scope=<organization_name> --force`

> `--scope` is only necessary if the package name in the `package.json` file does not have the company name as a prefix. Always the company name must be with the "@-2 at the beginning and a separator "/" at the end.

```json
{
  "name": "@viamericas/viam-notification-documents"
}
```

## Validate weight of package

You can run the next commands to see the result of the bundle :

- `npm run build:debug`
- `npm run analizedependences`

> Need to have installed source-map-explorer globally.

```bash
npm install -g source-map-explorer
```
