# wadouk.github.io

hello

## build
docker run --rm   --volume="$PWD:/srv/jekyll:Z" --publish [::1]:4000:4000  -it jekyll/jekyll:4.1.0 jekyll serve --watch