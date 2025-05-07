# # set the base image to create the image fot react app
# FROM node:20-alpine

# # Create a user with permission to run the app
# #  -S => Create a system user
# # -G => add a user to the group 
# # this is done to avoid running the app as root
# #  If the app run app as root, any vulnerability in thre app can exploited to gain access  to the host system
# #  It's a good practice to run the app as a non- root user
# #
# RUN addgroup app && adduser -S -G app app

# # srt the user to run the app
# USER app

# # set the working directory to /app
# WORKDIR /app

# # copy package.json and package-lock.josn to the working direct
# # This is done before copying the rest of the files to take adventage of Docker's cache
# # IF the package.json and lock files hanve'nt changed it will take from cached depemdency
# COPY package*.json ./

# # Some time the owner ship of the files in the working directory is changed to root 
# # and thus the app can't access the files and throw an error => as PERMISSION DENIED 
# # To avoid this, change  the owner ship of the files to the root user
# USER root

# # Change the ownership of the app dir_ to the app user
# # chown -R <user>:<group> <directory>
# # chown command changes the user and/or group ownership of for given files
# RUN chown -R app:app /app


# RUN npm install

# COPY . .

# EXPOSE 5173

# CMD npm run dev

# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY src/ ./src/
COPY public/ ./public/
COPY components.json .
COPY eslint.config.js .
COPY index.html .
COPY vite.config.ts .
COPY tsconfig.app.json .
COPY tsconfig.json .
COPY tsconfig.node.json .
COPY vite.config.ts .

RUN npm run build

# Stage 2: Serve
FROM node:20-alpine

# Optional: install 'serve' to serve static build
RUN npm install -g serve

WORKDIR /app

# Copy built files from builder
COPY --from=builder /app/dist ./dist

# Use non-root user (optional, but secure)
RUN addgroup app && adduser -S -G app app
USER app

EXPOSE 5173

CMD ["serve", "-s", "dist", "-l", "5173"]
