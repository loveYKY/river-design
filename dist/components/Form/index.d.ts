import { FC } from 'react';
import Form from './form';
import { FormItemProps } from './formItem';
export declare type IFormComponent = typeof Form & {
    Item: FC<FormItemProps>;
};
declare const TransForm: IFormComponent;
export default TransForm;
