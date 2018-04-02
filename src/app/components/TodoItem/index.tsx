import * as React from 'react'
import * as classNames from 'classnames'
import * as style from './style.css'
import styled from 'styled-components'
import { TodoModel } from 'app/models'
import { TodoActions } from 'app/actions'
import { TodoTextInput } from '../TodoTextInput'

export namespace TodoItem {
	export interface Props {
		todo: TodoModel
		editTodo: typeof TodoActions.editTodo
		deleteTodo: typeof TodoActions.deleteTodo
		completeTodo: typeof TodoActions.completeTodo
	}

	export interface State {
		editing: boolean
	}
}

const Text = styled.label`
	background: blue;

`

export class TodoItem extends React.Component<TodoItem.Props, TodoItem.State> {
	constructor(props: TodoItem.Props, context?: any) {
		super(props, context)
		this.state = { editing: false }
	}

	handleDoubleClick() {
		this.setState({ editing: true })
	}

	handleSave(id: number, text: string) {
		if (text.length === 0) {
			this.props.deleteTodo(id)
		} else {
			this.props.editTodo({ id, text })
		}
		this.setState({ editing: false })
	}

	render() {
		const { todo, completeTodo, deleteTodo } = this.props

		let element
		if (this.state.editing) {
			element = <TodoTextInput text={todo.text} editing={this.state.editing} onSave={(text) => todo.id && this.handleSave(todo.id, text)} />
		} else {
			element = (
				<div className={style.view}>
					<input className={style.toggle} type="checkbox" checked={todo.completed} onChange={() => todo.id && completeTodo(todo.id)} />
					<label onDoubleClick={() => this.handleDoubleClick()}>
					<Text>{todo.text}</Text>
					</label>
					<button
						className={style.destroy}
						onClick={() => {
							if (todo.id) deleteTodo(todo.id)
						}}
					/>
				</div>
			)
		}

		// TODO: compose
		const classes = classNames({
			[style.completed]: todo.completed,
			[style.editing]: this.state.editing,
			[style.normal]: !this.state.editing
		})

		return (
			<div>
				<li className={classes}>{element}</li>
			</div>
		)
	}
}
