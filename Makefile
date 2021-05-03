build: build-nextjs
	go build

build-nextjs:
	cd nextjs; \
	npm install; \
	NEXT_TELEMETRY_DISABLED=1 npm run export

