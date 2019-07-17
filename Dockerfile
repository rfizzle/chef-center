# Stage 1 - the Javascript build process
FROM node:12.5 as build-deps
RUN mkdir -p /usr/src/app/
WORKDIR /usr/src/app
COPY ./web/package.json ./web/yarn.lock ./
RUN yarn
COPY ./web/ ./
RUN yarn build

# Stage 2 - the production environment
FROM ruby:2.6-alpine
RUN adduser -D -h /usr/src/app goiardi
RUN apk add git build-base sqlite-dev
RUN apk add --update tzdata

# Set user
USER goiardi

RUN mkdir -p /usr/src/app/public
WORKDIR /usr/src/app
COPY --chown=goiardi --from=build-deps /usr/src/app/build ./public
COPY --chown=goiardi ./api/ ./
RUN bundle install

# Setup ENV
ENV RAILS_SERVE_STATIC_FILES=true

COPY --chown=goiardi ./start.sh ./

EXPOSE 9292
ENTRYPOINT ['/bin/sh', './start.sh']