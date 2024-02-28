import commonInterface from "interfaces/commonInterface";

interface countriesInterface extends Omit<commonInterface, 'code'>{
  _id: string;
}

export default countriesInterface;
