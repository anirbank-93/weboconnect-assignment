import { v4 as uuidv4 } from "uuid";

interface UserObjectAttr {
  id: string;
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
}

const user:Array<UserObjectAttr> = [
    {
        id: uuidv4(),
        firstName: "Anirban",
        lastName: "Karmakar",
        email: "anirban.wis@gmail.com",
        password: "$2b$10$ekkg7sCWE5mixZ5kWLsxeev2/SCRONHCJe03SW/pK0uoN8kBUoXz2"
    },
    {
        id: uuidv4(),
        firstName: "Shamil",
        lastName: "Roy",
        email: "shamil.wis@gmail.com",
        password: "$2b$10$KuqWcHriAJAc6u9eA2Cv3uSmN4JMtoXhhBZq1TEM1qHap7D94dAoi"
    },
];

export default user;
