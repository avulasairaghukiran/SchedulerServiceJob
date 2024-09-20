// // @ts-ignore
// import {AV} from './AlphavimaCommon';

// Define a type for the API results if you want minimal typing
type ApiResponse = any; // Replace `any` with a more specific type if available

const dataRetrive = async (): Promise<ApiResponse> => {
  const fetchXml = `
<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">
<entity name="avpx_servicejob">
<attribute name="avpx_name"/>
<attribute name="createdon"/>
<attribute name="avpx_startdatetime"/>
<attribute name="avpx_jobstatus"/>
<attribute name="avpx_estimatedcost"/>
<attribute name="avpx_serviceorder"/>
<attribute name="avpx_location"/>
<attribute name="avpx_totallabourcost"/>
<attribute name="avpx_servicejobid"/>
<attribute name="ownerid"/>
<attribute name="avpx_labourhours"/>
<attribute name="avpx_labourcosthr"/>
<attribute name="avpx_laborcharges"/>
<attribute name="avpx_estimatedenddatetime"/>
<order attribute="avpx_name" descending="false"/>
<filter type="and">
<condition attribute="statecode" operator="eq" value="0"/>
<condition attribute="avpx_estimatedenddatetime" operator="not-null"/>
</filter>
</entity>
</fetch>`;
  try {
    // @ts-ignore
    const results: ApiResponse = await AV.Common.API.retrieveMultipleRecords('avpx_servicejob', null, fetchXml);
    console.log(results, "Results");
    return results;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Rethrow the error for the caller to handle
  }
};

export { dataRetrive };
