# E2E

This directory hosts the end-to-end tests for this application. Unit and component tests are found in the source code as `.test.tsx` files.

```bash
# Install dependencies
pip install -r requirements.txt

# Initialize rfbrowser
rfbrowser init

# Run tests
robot --outputdit out/ tests/
```