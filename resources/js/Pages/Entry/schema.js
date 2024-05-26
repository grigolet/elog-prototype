const mockContent = {
  title: "New Entry",
  description: "",
  type: "object",
  required: ["Experiment"],
  definitions: {
    Experiment: {
      type: "string",
      enum: ["ALICE", "ATLAS", "CMS", "LHCb"],
    },
  },
  properties: {
    System: {
      type: "object",
      properties: {
        Experiment: {
          $ref: "#/definitions/Experiment",
        },
      },
      dependencies: {
        Experiment: {
          oneOf: [
            {
              properties: {
                Experiment: {
                  enum: ["ALICE"],
                },
                SubSystem: {
                  type: "array",
                  title: "Sub Detector",
                  items: {
                    enum: ["TPC", "TRD", "MID", "MCH", "CPV", "TOF", "HMPID"],
                  },
                  uniqueItems: true,
                },
              },
            },
            {
              properties: {
                Experiment: {
                  enum: ["ATLAS"],
                },
                SubSystem: {
                  type: "array",
                  title: "Sub Detector",
                  items: {
                    enum: ["MMG", "MDT", "RPC", "TFC", "ID"],
                  },
                  uniqueItems: true,
                },
              },
            },
            {
              properties: {
                Experiment: {
                  enum: ["CMS"],
                },
                SubSystem: {
                  type: "array",
                  title: "Sub Detector",
                  items: {
                    enum: ["RPC", "CSC", "DT", "ID"],
                  },
                  uniqueItems: true,
                },
              },
            },
            {
              properties: {
                Experiment: {
                  enum: ["LHCb"],
                },
                SubSystem: {
                  type: "array",
                  title: "Sub Detector",
                  items: {
                    enum: ["RICH1", "RICH2", "SciFi", "UT", "MWPC"],
                  },
                  uniqueItems: true,
                },
              },
            },
          ],
        },
      },
    },
    Status: {
      type: "string",
      enum: ["To Do", "Done", "In Progress"],
      default: "To Do",
    },
    EntryDescription: {
      type: "string",
    },
  },
};
const mockLayout = {
  System: {
    "ui:title": "",
    SubSystem: {
      "ui:widget": "checkboxes",
    },
  },
  EntryDescription: {
    "ui:title": "",
    "ui:description": "",
    "ui:widget": "CKEditor",
  },
};

export { mockContent, mockLayout };
