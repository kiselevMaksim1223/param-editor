import { Component } from 'react'
import './App.css'

interface Param {
  id: number
  name: string
  type: 'text'
}

interface ParamValue {
  paramId: number
  value: string
}

interface Model {
  paramValues: ParamValue[]
}

interface Props {
  params: Param[]
  model: Model
  getModel: (model: Model) => void
}

interface State {
  paramValues: ParamValue[]
}

const params: Param[] = [
  { id: 1, name: 'Назначение', type: 'text' },
  { id: 2, name: 'Длинна', type: 'text' },
  { id: 3, name: 'Цвет', type: 'text' },
]

const model: Model = {
  paramValues: [
    { paramId: 1, value: 'Повседневная' },
    { paramId: 2, value: 'макси' },
    { paramId: 3, value: 'Любой' },
  ],
}
export const App = () => {
  const getModelHandler = (model: Model) => {
    console.log(model)
  }

  return (
    <div className={'wrapper'}>
      <ParamEditor params={params} model={model} getModel={getModelHandler} />
    </div>
  )
}

class ParamEditor extends Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      paramValues: props.model.paramValues,
    }
  }

  updateParamValue = (paramId: number, value: string) => {
    this.setState((prevState) => {
      const updatedParamValues = prevState.paramValues.map((paramValue) => {
        if (paramValue.paramId === paramId) {
          return { ...paramValue, value }
        }
        return paramValue
      })

      return { paramValues: updatedParamValues }
    })
  }

  public getModel = (): Model => {
    return { paramValues: this.state.paramValues }
  }

  onClickGetModelHandler = () => {
    this.props.getModel(this.getModel())
  }

  render() {
    const { params } = this.props
    const { paramValues } = this.state

    return (
      <div className={'block'}>
        {params.map((param) => {
          const paramValue = paramValues.find((value) => value.paramId === param.id)
          const value = paramValue ? paramValue.value : ''

          return (
            <div key={param.id} className={'block-item'}>
              <label>{param.name}</label>
              <input
                type={param.type}
                value={value}
                onChange={(e) => this.updateParamValue(param.id, e.target.value)}
              />
            </div>
          )
        })}
        <button onClick={this.onClickGetModelHandler} className={'button'}>
          get model on console
        </button>
      </div>
    )
  }
}
