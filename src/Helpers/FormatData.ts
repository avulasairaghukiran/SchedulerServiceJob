// import { SchedulerProjectData, SchedulerRow } from "../types/global";


// // Helper function to generate a unique ID
// function generateUniqueId(): string {
//   return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
//     const r = Math.random() * 16 | 0;
//     const v = c === 'x' ? r : (r & 0x3 | 0x8);
//     return v.toString(16);
//   });
// }

// // Define types for the data structures
// export interface Entity {
//   _ownerid_value: string;
//   "_ownerid_value@OData.Community.Display.V1.FormattedValue": string;
//   avpx_servicejobid: string;
//   avpx_startdatetime: string;
//   avpx_estimatedenddatetime: string;
//   avpx_name: string;
// }

// export interface Job {
//   id: string;
//   startDate: string;
//   endDate: string;
//   occupancy: number;
//   title: string;
//   bgColor: string;
// }



// function transformData(entities: Entity[]): SchedulerRow[] {
//   const groupedData: { [key: string]: SchedulerRow } = {};

//   entities.forEach(entity => {
//     const ownerId = entity._ownerid_value;
//     const ownerTitle = entity["_ownerid_value@OData.Community.Display.V1.FormattedValue"];
    
//     const job: SchedulerProjectData = {
//       id: entity.avpx_servicejobid,
//       startDate: new Date(entity.avpx_startdatetime),
//       endDate: new Date(entity.avpx_estimatedenddatetime),
//       occupancy: 4000, // Occupancy in seconds
//       title: entity.avpx_name,
//       bgColor: "rgb(103, 35, 103)"
//     };

//     if (!groupedData[ownerId]) {
//       groupedData[ownerId] = {
//         id: generateUniqueId(), // Generate unique ID for each resource
//         label: {
//           title: ownerTitle,
//           icon: "",
//           subtitle: ""
//         },
//         data: []
//       };
//     }

//     groupedData[ownerId].data.push(job);
//   });

//   // Convert grouped data into the desired format
//   console.log(Object.values(groupedData), "Format Data");
//   return Object.values(groupedData);
// }

// export { transformData };

// {/**
//   // function generateUniqueId() {
// //     // Helper function to generate a unique ID
// //     return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
// //       var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
// //       return v.toString(16);
// //     });
// //   }
   
// //   function transformData(entities) {
// //     const groupedData = {};
  
// //     entities.forEach(entity => {
// //       const ownerId = entity._ownerid_value;
// //           const ownerTitle = entity["_ownerid_value@OData.Community.Display.V1.FormattedValue"];
   
      
// //       const job = {
// //         id: entity.avpx_servicejobid,
// //         startDate: new Date(entity.avpx_startdatetime).toISOString(),
// //         endDate: new Date(entity.avpx_estimatedenddatetime).toISOString(),
// //         occupancy: 4000, // Occupancy in seconds
// //         title: entity.avpx_name,
// //         bgColor: "rgb(103, 35, 103)"
// //       };
   
// //       if (!groupedData[ownerId]) {
// //         groupedData[ownerId] = {
// //           id: generateUniqueId(), // Generate unique ID for each resource
// //           label: {
// //             title: ownerTitle
// //           },
// //           data: []
// //         };
// //       }
   
// //       groupedData[ownerId].data.push(job);
// //     });
   
// //     // Convert grouped data into the desired format
// //     console.log(Object.values(groupedData),"Format Data")
// //     return Object.values(groupedData);
// //   }
   
// // export {transformData}
  
  
//   */}

