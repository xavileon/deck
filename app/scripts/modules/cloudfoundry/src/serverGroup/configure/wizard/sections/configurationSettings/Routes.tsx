import * as React from 'react';
import { FieldArray, getIn } from 'formik';

import { FormikFormField, HelpField, IWizardPageProps, TextInput } from '@spinnaker/core';

import { ICloudFoundryCreateServerGroupCommand } from 'cloudfoundry/serverGroup/configure/serverGroupConfigurationModel.cf';

export interface IRoutesProps extends IWizardPageProps<ICloudFoundryCreateServerGroupCommand> {}

export class Routes extends React.Component<IRoutesProps> {
  public render() {
    return (
      <div>
        <div className="form-group">
          <div className="col-md-12">
            <b>Routes</b>
            &nbsp;
            <HelpField id="cf.serverGroup.routes" />
            <FieldArray
              name="manifest.routes"
              render={arrayHelpers => {
                const serverGroupCommand: ICloudFoundryCreateServerGroupCommand = arrayHelpers.form.values;
                const routes: string[] = getIn(serverGroupCommand, 'manifest.routes')
                  ? getIn(serverGroupCommand, 'manifest.routes')
                  : [];

                return (
                  <table className="table table-condensed packed metadata">
                    <tbody>
                      {routes.map((_, index: number) => (
                        <tr key={index}>
                          <td>
                            <div className="sp-margin-m-bottom">
                              <FormikFormField
                                name={`manifest.routes[${index}]`}
                                input={props => <TextInput {...props} />}
                                required={true}
                              />
                            </div>
                          </td>
                          <td>
                            <a className="btn btn-link sm-label" onClick={() => arrayHelpers.remove(index)}>
                              <span className="glyphicon glyphicon-trash" />
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan={2}>
                          <button type="button" className="add-new col-md-12" onClick={() => arrayHelpers.push('')}>
                            <span className="glyphicon glyphicon-plus-sign" /> Add New Route
                          </button>
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                );
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}
