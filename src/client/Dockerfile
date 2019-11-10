FROM python

WORKDIR /client

COPY src/ .

# run python http server to serve static client content
# -d /directory/to/serve
# final arg: port number
CMD python -m http.server -d . 3000