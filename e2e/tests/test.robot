*** Settings ***
Library    Browser

*** Variables ***
${HOSTNAME}     http://localhost:3000
${BROWSER}      chromium
${HEADLESS}     false

*** Test Cases ***
Can see the brightness slider
    Start a browser with a page

    Can see the brightness slider

Can turn brightness off using the shortcut button
    Start a browser with a page

    Click brightness off shortcut button

Can turn brightness on using the shortcut button
    Start a browser with a page

    Click brightness on shortcut button

*** Keywords ***
Click brightness off shortcut button
    Click    data-test-id=brightness-button-off

Click brightness on shortcut button
    Click    data-test-id=brightness-button-on

Can see the brightness slider
    Get Element    data-test-id=brightness-slider

Start a browser with a page
    New Browser    ${BROWSER}    headless=${HEADLESS}
    New Context
    New Page    ${HOSTNAME}
