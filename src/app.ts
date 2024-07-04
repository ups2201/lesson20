interface User {
    name: string;
    age: number;
}

function greet(user: User) {
    console.log('Hello', user.name)
}

const user: User =  {
  name: 'Alex',
  age: 35
}

greet(user)