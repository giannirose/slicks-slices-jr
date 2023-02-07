import { MdLocalPizza as icon } from 'react-icons/md';
import PriceInput from '../components/PriceInput';

export default {
  // Computer name
  name: 'pizza',
  // Visible title
  title: 'Pizzas',
  type: 'document',
  icon,
  fields: [
    {
      name: 'name',
      title: 'Pizza Name',
      type: 'string',
      description: 'Name of the Pizza',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description:
        'Use the Generate button to enter the name as the slug, or create your own',
      options: {
        source: 'name',
        maxLength: 100,
      },
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      description: 'Enter below: Cost of the pizza in cents',
      validation: (Rule) => Rule.min(400).max(5000),
      // TODO Add custom input component to get control over how it looks
      inputComponent: PriceInput,
    },
    {
      name: 'toppings',
      title: 'Toppings',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'topping' }] }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
      // changed from toppings: 'toppings', to
      topping0: 'toppings.0.name',
      topping1: 'toppings.1.name',
      topping2: 'toppings.2.name',
      topping3: 'toppings.3.name',
    },
    //     prepare: ({ title, media, ...toppings }) => {
    //       // 1. Filter undefined toppings out
    //       const tops = Object.values(toppings).filter(
    //         (topping) => topping !== undefined
    //       );
    //       // 2. Return the previow object for the pizza
    //       return {
    //         title,
    //         media,
    //         subtitle: tops.join(', '),
    //       };
    //     },
    //   },
    // };
    prepare: ({ title, media, ...toppings }) => {
      // 1. Filter undefined toppings out
      const tops = Object.values(toppings).filter(Boolean);
      // 2. return the preview object for the pizza
      return {
        title,
        media,
        subtitle: tops.join(', '),
      };
    },
  },
};
