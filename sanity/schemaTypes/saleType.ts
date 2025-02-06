import { TagIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const saleType = defineType({
  name: "sale",
  title: "Sale",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({
      name: "title",
      title: "sale Title",
      type: "string",
    }),
    defineField({
      name: "Description",
      title: "sale Description",
      type: "text",
    }),
    defineField({
      name: "badge",
      title: "Discount Badge",
      type: "string",
      description: "Discount Ratio",
    }),
    defineField({
      name: "discountAmount",
      title: "Discount Amount",
      type: "number",
      description: "Amount off in percentage or fixed value",
    }),
    defineField({
      name: "couponCode",
      title: "Coupon Code",
      type: "string",
    }),
    defineField({
      name: "validForm",
      title: "Valid From",
      type: "datetime",
    }),
    defineField({
      name: "validUntill",
      title: "Valid Untill",
      type: "datetime",
    }),
    defineField({
      name: "isActive",
      title: "Is Active",
      type: "boolean",
      description: "toggle to activate/deactivate the sale",
      initialValue: true,
    }),
    defineField({
        name:"image",
        title:"Image",
        type:"image",
        options:{
            hotspot:true
        },
        validation:Rule=>Rule.required()
    })
  ],
  preview: {
    select: {
        title:"title",
        discountAmount:"discountAmount",
        couponCode:"couponCode",
        isActive:"isActive",
    },
    prepare: ({title,discountAmount,couponCode,isActive}) => {
        const status = isActive ? "Active" : "Inactive";
        return {
            title,
            subtitle:`${discountAmount}% off | ${couponCode} | ${status}`
        }
    }
  }
});
