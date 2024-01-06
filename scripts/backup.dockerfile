FROM node:20.10-alpine as baseimage

ARG userName=centrin
ENV TZ=Europe/Prague

WORKDIR /app
RUN adduser -D -G root ${userName} \
    && apk update \
    && apk upgrade --no-cache --quiet \
    && apk add --no-cache --quiet \
    postgresql-client \
    && chown -R centrin:root /app \
    && chgrp -R 0 /app \
    && chmod -R g=u /app

FROM baseimage as builder

COPY . .
RUN yarn

FROM baseimage as backupimage

ARG userName=centrin
COPY --chown=${userName}:root --from=builder /app/ .
USER ${userName}

CMD ["yarn", "backup"]

