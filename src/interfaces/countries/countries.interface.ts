import CommonInterface from "interfaces/commonInterface";

interface CountriesInterface extends Omit<CommonInterface, 'code'>{
  _id: string;
}

export default CountriesInterface;
