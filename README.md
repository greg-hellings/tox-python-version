# Tox Run composite action

Parses a tox environment name for appropriate pyXX factors and
determines the version of Python that ought to be installed, as
expected by the [setup-python](https://github.com/actions/setup-python)
action.

## Inputs

### tox-env

The name of the tox environment to execute.

## Outputs

### python-version

The version of Python to pass into the setup-python invocation

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
      - uses: greg-hellings/tox-python-version@v1
        with:
          tox-env: ${{ matrix.tox-env }}
        id: tox-env
      - uses: actions/setup-python@v2
        with:
          python-version: ${{ steps.tox-env.outputs.python-version }}
      - name: Install and run tox
        shell: bash
        run: |
          python -m pip install -U tox
          tox -e ${{ matrix.tox-env }}
```
