# Welcome to babaw
This webapp provides a UI and a REST API so that you can easily print images received from whatsapp.

# The way it works
- You forward the images you want to print to an already set up whatsapp business account that has a webhook that calls the API in the webapp which adds it to a temporary queue in the webapp that you can view from the UI (after logging in), and subsequently print the images directly.
- I created this because I don't have an IP printer, and wanted to remove the minor inconvenience of logging into whatsapp on the desktop and then downloading the images, and then printing them.
