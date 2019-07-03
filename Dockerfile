FROM microsoft/dotnet:2.1-sdk as build-env
WORKDIR /app
#setup node
ENV NODE_VERSION 8.9.4
ENV NODE_DOWNLOAD_SHA 21fb4690e349f82d708ae766def01d7fec1b085ce1f5ab30d9bda8ee126ca8fc

RUN curl -SL "https://nodejs.org/dist/v${NODE_VERSION}/node-v${NODE_VERSION}-linux-x64.tar.gz" --output nodejs.tar.gz \
    && echo "$NODE_DOWNLOAD_SHA nodejs.tar.gz" | sha256sum -c - \
    && tar -xzf "nodejs.tar.gz" -C /usr/local --strip-components=1 \
    && rm nodejs.tar.gz \
    && ln -s /usr/local/bin/node /usr/local/bin/nodejs

# copy csproj and restore as distinct layers
COPY *.csproj ./
RUN dotnet restore

# copy everything else and build
COPY . ./
RUN dotnet publish -c Release -o out

# build runtime image
FROM microsoft/dotnet:2.1-aspnetcore-runtime
WORKDIR /app
#setup node, this is only needed if you use Node both at runtime and build time. Some people may only need the build part.
ENV NODE_VERSION 8.9.4
ENV NODE_DOWNLOAD_SHA 21fb4690e349f82d708ae766def01d7fec1b085ce1f5ab30d9bda8ee126ca8fc

RUN curl -SL "https://nodejs.org/dist/v${NODE_VERSION}/node-v${NODE_VERSION}-linux-x64.tar.gz" --output nodejs.tar.gz \
    && echo "$NODE_DOWNLOAD_SHA nodejs.tar.gz" | sha256sum -c - \
    && tar -xzf "nodejs.tar.gz" -C /usr/local --strip-components=1 \
    && rm nodejs.tar.gz \
    && ln -s /usr/local/bin/node /usr/local/bin/nodejs

EXPOSE 5000
#:80
ENV USER_SECRETS_ID 65015713-1466-415e-8bdd-aa3c1034d755
ENV HOME_PATH /Users/mattstates
ENV PATH ~/.microsoft/usersecrets/65015713-1466-415e-8bdd-aa3c1034d755
RUN echo "~/.microsoft/usersecrets/${USER_SECRETS_ID}:~/.microsoft/usersecrets/${USER_SECRETS_ID}"
VOLUME [ "/Users/mattstates/.microsoft/usersecrets/${USER_SECRETS_ID}:/app/.microsoft/usersecrets/${USER_SECRETS_ID}" ]
VOLUME /Users/mattstates/.microsoft/usersecrets/${USER_SECRETS_ID} /app/.microsoft/usersecrets/${USER_SECRETS_ID}
VOLUME secrets /root/.microsoft/usersecrets/65015713-1466-415e-8bdd-aa3c1034d755


COPY --from=build-env /app/out .
ENTRYPOINT ["dotnet", "mattstates.dll"]

# docker run --name test1 -v /Users/mattstates/.microsoft/usersecrets/65015713-1466-415e-8bdd-aa3c1034d755:/root/.microsoft/usersecrets/65015713-1466-415e-8bdd-aa3c1034d755 mattstates:latest -p 3000:80
# docker run --name test1 -v /Users/mattstates/.microsoft/usersecrets/65015713-1466-415e-8bdd-aa3c1034d755:/app/.microsoft/usersecrets/65015713-1466-415e-8bdd-aa3c1034d755 mattstates:latest -p 3000:80
# docker run --name test1 -v secrets:/root/.microsoft/usersecrets/65015713-1466-415e-8bdd-aa3c1034d755 mattstates:latest -p 3000:80
# docker run --name test1 -v secrets:/root/.microsoft/usersecrets/65015713-1466-415e-8bdd-aa3c1034d755 -v secrets:/root/.microsoft/usersecrets/65015713-1466-415e-8bdd-aa3c1034d755 mattstates:latest -p 3000:80