# Chef-Center

An open source UI for Chef-Server & Goiardi (more focused on Goiardi).

This tool was created using Rails 6 (API) + React & Redux & Material-UI.

# Dependencies

* Docker

# Run instructions
Build the container:
```bash
docker build -t chef-center .
```

Encode your PEM file with base64:
```bash
cat chef-webui.pem | base64
```

Run the container with ENV variables:
```bash
docker run --name chef-center \
 -e CHEF_SERVER_URL=<url> \
 -e CHEF_CLIENT_NAME=<user> \
 -e CHEF_CLIENT_KEY=<base64 PEM> \
 chef-center 
```
