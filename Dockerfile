FROM node:18
WORKDIR /home/ant/ntic/library-project
RUN npm install -g @angular/cli
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
EXPOSE 4200
CMD ["ng", "serve", "--host", "0.0.0.0"]


#--------------------------------------------
# # Stage 1: Compile and Build angular codebase

# # Use official node image as the base image
# FROM node:latest as build

# # Set the working directory
# WORKDIR /home/ant/ntic/library-project

# # Add the source code to app
# COPY ./ /home/ant/ntic/library-project

# # Install all the dependencies
# RUN npm install

# # Generate the build of the application
# RUN npm run build


# # Stage 2: Serve app with nginx server

# # Use official nginx image as the base image
# FROM nginx:latest

# # Copy the build output to replace the default nginx contents.
# COPY --from=build /home/ant/ntic/library-project /usr/share/nginx/html

# # Expose port 80
# EXPOSE 80


# ----------------------------------------------------------------
# build from source
# ----------------------------
# FROM node:18 AS build

# WORKDIR /home/ant/ntic/library-project

# COPY package*.json .
# RUN npm install

# COPY . .
# RUN npm run build

# ----------------------------
# run with nginx
# ----------------------------
# FROM nginx

# RUN rm /etc/nginx/conf.d/default.conf
# COPY nginx.conf /etc/nginx/conf.d
# COPY --from=build /home/ant/ntic/library-project /usr/share/nginx/html
# EXPOSE 4200

# CMD ["npm", "start"]

# CMD ["nginx", "-g", "daemon off;"]