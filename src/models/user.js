import { model, Schema } from "mongoose";

const userSchema= new Schema(
  {
    name: { type: String, trim: true },
    email: { type: String, unique: true, required: true, trim: true },
    password: { type: String, required: true },
    avatar: {type: String,required:false ,default:"https://ac.goit.global/fullstack/react/default-avatar.jpg"},
    gender: {
    type: String,
    enum: {
      values: ['boy', 'girl', null],
      message: 'Стать може бути: boy, girl чи null'
    }},
    dueDate: {
    type: Date,
    required: [true, 'Дата пологів є обовязковою'],
    validate: {
      validator: function(value) {
        const curDate = new Date();
        const minDate = new Date();
        minDate.setDate(curDate.getDate() + 7);

        const maxDate = new Date();
        maxDate.setDate(curDate.getDate() + 40 * 7); в

        return value >= minDate && value <= maxDate;
      },
      message: 'Дата пологів повинна бути в межах від 1 до 40 тижнів від поточної дати'
    }
  }
},
{
  timestamps: true
});


userSchema.pre('save',function(){
  if (!this.username) {
    this.username = this.email;
  }
});

userSchema.methods.toJSON=function(){
  const obj=this.toObject();
  delete obj.password;
  return obj;
};

export const User=model('User',userSchema);

