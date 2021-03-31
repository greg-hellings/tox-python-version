# Tox Run composite action

Install the appropriate versions of Python (defaults to 3.x) based
on a given tox environment, and then execute that environment against
the tox version installed there.

## Inputs

### tox-env

The name of the tox environment to execute.

### tox-args

A string of extra arguments to pass to tox, such as the path to
the config file, options for quiet execution, etc.

## Example usage

```yaml
jobs:
  execute:
    strategy:
      matrix:
        tox-env:
          - py36
          - py37
          - pypy3
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: greg-hellings/tox-run@v1
        with:
          tox-env: ${{ matrix.tox-env }}
```
