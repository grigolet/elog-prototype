<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\FieldSchema>
 */
class FieldSchemaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'content' => json_decode(<<<'JSON'
            {
            "title":"",
            "description":"",
            "type":"object",
            "definitions":{
                "Experiment":{
                "type":"string",
                "enum":[
                    "ALICE",
                    "ATLAS",
                    "CMS",
                    "LHCb"
                ]
                }
            },
            "properties":{
                "System":{
                "type":"object",
                "properties":{
                    "Experiment":{
                    "$ref":"#/definitions/Experiment"
                    }
                },
                "required":[
                    "Experiment"
                ],
                "dependencies":{
                    "Experiment":{
                    "oneOf":[
                        {
                        "properties":{
                            "Experiment":{
                            "enum":[
                                "ALICE"
                            ]
                            },
                            "SubSystem":{
                            "type":"array",
                            "title":"Sub Detector",
                            "items":{
                                "enum":[
                                "TPC",
                                "TRD",
                                "MID",
                                "MCH",
                                "CPV",
                                "TOF",
                                "HMPID"
                                ]
                            },
                            "uniqueItems":true
                            }
                        }
                        },
                        {
                        "properties":{
                            "Experiment":{
                            "enum":[
                                "ATLAS"
                            ]
                            },
                            "SubSystem":{
                            "type":"array",
                            "title":"Sub Detector",
                            "items":{
                                "enum":[
                                "MMG",
                                "MDT",
                                "RPC",
                                "TFC",
                                "ID"
                                ]
                            },
                            "uniqueItems":true
                            }
                        }
                        },
                        {
                        "properties":{
                            "Experiment":{
                            "enum":[
                                "CMS"
                            ]
                            },
                            "SubSystem":{
                            "type":"array",
                            "title":"Sub Detector",
                            "items":{
                                "enum":[
                                "RPC",
                                "CSC",
                                "DT",
                                "ID"
                                ]
                            },
                            "uniqueItems":true
                            }
                        }
                        },
                        {
                        "properties":{
                            "Experiment":{
                            "enum":[
                                "LHCb"
                            ]
                            },
                            "SubSystem":{
                            "type":"array",
                            "title":"Sub Detector",
                            "items":{
                                "enum":[
                                "RICH1",
                                "RICH2",
                                "SciFi",
                                "UT",
                                "MWPC"
                                ]
                            },
                            "uniqueItems":true
                            }
                        }
                        }
                    ]
                    }
                }
                },
                "Status":{
                "type":"string",
                "enum":[
                    "To Do",
                    "Done",
                    "In Progress"
                ],
                "default":"To Do"
                }
            }
            }
        JSON, true),
            'layout' => json_decode(<<<'JSON'
                {
                    "System": {
                        "ui:title": "",
                        "SubSystem": {
                            "ui:widget": "checkboxes"
                        }
                    }
                }
            JSON, true),
        ];
    }
}

/**
 * "properties": {
                            "time": {
                                "type": "number"
                            },
                            "blocks": {
                                "type": "array",
                                "items": {
                                    "type": "object"
                                }
                            },
                            "version": {
                                "type": "string"
                            }
                        }
 */
