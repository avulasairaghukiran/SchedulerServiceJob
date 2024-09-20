import { SchedulerProjectData, SchedulerRow } from "../types/global";


// Helper function to generate a unique ID
function generateUniqueId(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
const colors: { [key: number]: string } = {
    783090000: "rgb(21, 180, 191)",
    // New
    783090001: "rgb(21, 132, 191)",
    // Work in Progress
    783090002: "rgb(40, 167, 69)",
    // Completed
    783090003: "rgb(220, 53, 53)",
    // Cancelled
    783090004: "rgb(253, 126, 20)",
    // On Hold
};
const jobstatusObject:{[key:number]:string}={
    783090000: "New",
    // New
    783090001: "Work In Progress",
    // Work in Progress
    783090002: "Completed",
    // Completed
    783090003: "Cancelled",
    // Cancelled
    783090004: "On Hold",
    // On Hold
}
  
// Define types for the data structures
export interface Entity {
  _ownerid_value: string;
  "_ownerid_value@OData.Community.Display.V1.FormattedValue": string;
  avpx_servicejobid: string;
  avpx_startdatetime: string;
  avpx_estimatedenddatetime: string;
  avpx_name: string;
  avpx_labourcosthr: number;
  avpx_labourhours: number;
  avpx_jobstatus: number; // Add the 'avpx_jobstatus' property
  "avpx_startdatetime@OData.Community.Display.V1.FormattedValue": string;
  "avpx_estimatedenddatetime@OData.Community.Display.V1.FormattedValue": string;
  avpx_estimatedcost:number;

}

export interface Job {
  id: string;
  startDate: string;
  endDate: string;
  occupancy: number;
  title: string;
  bgColor: string;
  jobstatus:string;
  labourcosthr: number,
  labourhours: number,
  startFormatDate:string,
  endFormatedEstimatedDate:string
}


function transformData(entities: Entity[]): SchedulerRow[] {
  const groupedData: { [key: string]: SchedulerRow } = {};
  const variableDay:number = 24 * 60 * 60 * 1000;

  entities.forEach(entity => {
    const ownerId = entity._ownerid_value;
    const ownerTitle = entity["_ownerid_value@OData.Community.Display.V1.FormattedValue"];
    
    const job: SchedulerProjectData = {
      id: entity.avpx_servicejobid,
      startDate: new Date(entity.avpx_startdatetime),
      endDate: entity.avpx_estimatedenddatetime ? new Date(entity.avpx_estimatedenddatetime) : new Date(new Date(entity.avpx_startdatetime).getTime() + variableDay),
      occupancy: 4000, // Occupancy in seconds
      title: entity.avpx_name,
      bgColor: colors[entity.avpx_jobstatus],
      jobstatus: jobstatusObject[entity.avpx_jobstatus],
      estimatedcost: entity.avpx_estimatedcost,
      labourcosthr: entity.avpx_labourcosthr,
      labourhours: entity.avpx_labourhours,
      startFormatDate: entity["avpx_startdatetime@OData.Community.Display.V1.FormattedValue"],
      endFormatedEstimatedDate: entity["avpx_estimatedenddatetime@OData.Community.Display.V1.FormattedValue"],
    };

    if (!groupedData[ownerId]) {
      groupedData[ownerId] = {
        id: generateUniqueId(), // Generate unique ID for each resource
        label: {
          title: ownerTitle,
          icon: "",
          subtitle: ""
        },
        data: []
      };
    }
    groupedData[ownerId].data.push(job);
  });

  // Convert grouped data into the desired format
  console.log(Object.values(groupedData), "Format Data");
  return Object.values(groupedData);
}

export { transformData };