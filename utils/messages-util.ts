// Element Interaction - Click and Input
export const MSG_CLICK_MESSAGE = (selector: string) => `CLICKED ON ELEMENT ${selector}`;
export const MSG_FILL_DATA = (selector: string) => `FILLED DATA INTO ${selector}`;
export const EXCEPTION_ERROR_CLICK_ELEMENT = (selector: string, error: Error) => `ERROR CLICKING ELEMENT ${selector}: ${error.message}`;
export const EXCEPTION_ERROR_FILL_DATA = (selector: string, error: Error) => `ERROR FILLING DATA IN ${selector}: ${error.message}`;
 
// Verify and Wait Element
export const MSG_VERIFY_ELEMENT = (actualAttributeValue: string, expectedAttributeValue: string) =>
    `ACTUAL VALUE IS: ${actualAttributeValue} AND EXPECTED VALUE IS: ${expectedAttributeValue}`;
export const MSG_VISIBLE_ELEMENT = (selector: string) => `THIS ELEMENT IS VISIBLE: ${selector}`;
export const EXCEPTION_ERROR_VERIFY_ELEMENT = (selector: string, error: Error) =>
    `ERROR CHECKING VISIBILITY FOR ${selector}: ${error.message}`;
export const EXCEPTION_ERROR_VISIBLE_ELEMENT = (selector: string, error: Error) =>
    `ERROR: ELEMENT VISIBILITY CHECK FOR ${selector} FAILED: ${error.message}`;
 
// Text Assertion
export const MSG_ASSERTION_ELEMENT = (actual_attribute_value: string) => `ACTUAL VALUE IS: ${actual_attribute_value}`;
export const EXCEPTION_ASSERTION_ELEMENT = (error: Error) => `AN ERROR OCCURRED GETTING THE ATTRIBUTE: ${error.message}`;
 
 
 