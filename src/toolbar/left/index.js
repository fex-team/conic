var React = require('react')
var Select = require('antd/lib/select')
var Option = Select.Option
var Checkbox = require('antd/lib/checkbox')
var Radio = require('antd/lib/radio')
var RadioGroup = require('antd/lib/radio/group')
var $ = require('jquery')
require('./index.scss')

module.exports = React.createClass({
    getInitialState: function () {
        return {
            // 当前选中的组件对象
            selection: {}
        }
    },

    render: function () {
        let form = (
            <form className="ant-form-horizontal">
                <div className="ant-form-item">
                    <label htmlFor="control-input"
                           className="col-6">输入框：</label>

                    <div className="col-14">
                        <input type="text"
                               className="ant-input"
                               id="control-input"
                               placeholder="Please enter..."/>
                    </div>
                </div>
                <div className="ant-form-item">
                    <label htmlFor="control-textarea"
                           className="col-6">文本域：</label>

                    <div className="col-14">
                        <textarea className="ant-input"
                                  id="control-textarea"></textarea>
                    </div>
                </div>
                <div className="ant-form-item">
                    <label className="col-6">Select 选择器：</label>

                    <div className="col-14">
                        <Select size="large"
                                defaultValue="lucy"
                                style={{width:200}}>
                            <Option value="jack">jack</Option>
                            <Option value="lucy">lucy</Option>
                            <Option value="disabled"
                                    disabled>disabled</Option>
                            <Option value="yiminghe">yiminghe</Option>
                        </Select>
                    </div>
                </div>
                <div className="ant-form-item ant-form-item-compact">
                    <label className="col-6">Checkbox 多选框：</label>

                    <div className="col-18">
                        <label className="ant-checkbox-vertical">
                            <Checkbox />选项一
                        </label>
                        <label className="ant-checkbox-vertical">
                            <Checkbox />选项二
                        </label>
                        <label className="ant-checkbox-vertical">
                            <Checkbox disabled={true}/>选项三（不可选）
                        </label>
                    </div>
                </div>
                <div className="ant-form-item ant-form-item-compact">
                    <label className="col-6">Checkbox 多选框：</label>

                    <div className="col-18">
                        <label className="ant-checkbox-inline">
                            <Checkbox />选项一
                        </label>
                        <label className="ant-checkbox-inline">
                            <Checkbox />选项二
                        </label>
                        <label className="ant-checkbox-inline">
                            <Checkbox />选项三
                        </label>
                    </div>
                </div>
                <div className="ant-form-item ant-form-item-compact">
                    <label className="col-6">Radio 单选框：</label>

                    <div className="col-18">
                        <RadioGroup value="b">
                            <Radio value="a">A</Radio>
                            <Radio value="b">B</Radio>
                            <Radio value="c">C</Radio>
                            <Radio value="d">D</Radio>
                        </RadioGroup>
                    </div>
                </div>
            </form>
        )

        return (
            <div>
                {
                    $.isEmptyObject(this.state.selection) ? <div className="nothing">
                        <div className="bold">编辑组件</div>

                        <div>请选中一个组件</div>
                    </div> : form
                }
            </div>
        )
    }
})