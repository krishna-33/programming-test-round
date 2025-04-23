import { DataTypes, Sequelize, Model, Optional } from 'sequelize';

interface TemplateAttributes {
    id: number;
    name: string;
    sections: number[];
    slots: number;
}

interface TemplateCreationAttributes extends Optional<TemplateAttributes, 'id'> {}

export class Template extends Model<TemplateAttributes, TemplateCreationAttributes> implements TemplateAttributes {
    public id!: number;
    public name!: string;
    public sections!: number[];
    public slots!: number;
}

export const TemplateFactory = (sequelize: Sequelize) => {
  Template.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      sections: {
        type: DataTypes.JSON,
        allowNull: false
      },
      slots: {
        type:DataTypes.INTEGER
      }
    },
    {
      tableName: 'templates',
      sequelize,
      hooks: {
        beforeSave: (template) => {
          template.slots = template.sections.reduce((a, b) => a + b, 0);
        },
      },
    }
  );

  return Template;
};
