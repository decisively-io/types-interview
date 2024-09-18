# DEPRECATED: Types now live in `@decisively-io/interview-sdk`

# Decisively Interview Types

A package containing all types for the Decisively interview system.

## Development

You can run typescript compile in watch mode using:

```sh
yarn dev
```

It is recommended to link the package so you can test within a different project.

```sh
yarn link
```

Then in another project

```sh
yarn link @decisively-io/types-interview
```

## Deploying the package

Simply use the standard publish!

It will auto trigger a build as part of the `prepublish` step.

```sh
yarn publish
```

**NOTE** Please make sure to push after a publish, otherwise versions will get out of sync.
