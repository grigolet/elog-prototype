import Skeleton from "@/Layouts/Skeleton";
import Header from "@/Layouts/Header";
import ajv8 from "@rjsf/validator-ajv8";
import Ajv from "ajv";
import { useForm, router, usePage } from "@inertiajs/react";

const ajv = new Ajv();

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { SchemaEditor } from "@/Components/Form/SchemaEditor";
import { Button } from "@/Components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/Components/ui/alert";
import { AlertCircle } from "lucide-react";

function validateSchema(value) {
  return avj.validateSchema(value);
}

export default function Create({ auth }) {
  const { data, setData, processing, errors, setError } = useForm({
    name: "",
    schema: "{}\n\n\n\n\n\n\n\n\n",
    uiSchema: "{}",
  });

  function parseAndSetJson(schema, fieldName, setErrorFunction) {
    try {
      return JSON.parse(schema);
    } catch ({ name, message }) {
      if (name === "SyntaxError")
        setErrorFunction(fieldName, "The provided schema is not a valid json");
      else setErrorFunction(fieldName, message);
    }
    return null;
  }

  function submit(e) {
    e.preventDefault();
    let errors = false;
    const parsedSchema = parseAndSetJson(data.schema, "schema", setError);
    const parsedUiSchema = parseAndSetJson(data.uiSchema, "uiSchema", setError);
    if (!ajv.validateSchema(JSON.parse(data.schema))) {
      setError("schema", "The JSON schema is invalid");
      errors = true;
    }
    if (data.schema.trim() === "{}") {
      setError(
        "schema",
        "Although a valid JSON schema, you should fill your schema with some properties."
      );
      errors = true;
    }
    if (data.name === "" || data.name === null) {
      setError("name", "Name must not be empty");
      errors = true;
    }
    console.log(typeof parsedSchema, parsedSchema);
    if (!errors)
      router.post("/logbooks", {
        name: data.name,
        schema: parsedSchema,
        uiSchema: parsedUiSchema,
      });
  }

  console.log(usePage().props);

  return (
    <Skeleton>
      <Header auth={auth}></Header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <Card>
          <CardHeader>
            <CardTitle>New Logbook</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={submit}>
              <div className="grid mx-auto w-full max-w-sm items-center gap-1.5 py-3">
                <Label htmlFor="name">Name of the logbook</Label>
                <Input
                  type="name"
                  id="name"
                  placeholder="Name"
                  onChange={(e, v) => setData("name", e.target.value)}
                />
                {errors.name && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{errors.name}</AlertDescription>
                  </Alert>
                )}
              </div>
              <div className="grid w-full gap-1.5 py-3">
                <Label htmlFor="schema-editor">JSON schema of the form</Label>
                <SchemaEditor
                  id="schema-editor"
                  value={data.schema}
                  onChange={(value, event) => setData("schema", value)}
                ></SchemaEditor>
                {errors.schema && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{errors.schema}</AlertDescription>
                  </Alert>
                )}
              </div>
              <div className="grid w-full gap-1.5 py-3">
                <Label htmlFor="ui-schema-editor">UI schema of the form</Label>
                <SchemaEditor
                  id="ui-schema-editor"
                  className="w-full h-48"
                  value={data.uiSchema}
                  onChange={(value, event) => setData("uiSchema", value)}
                ></SchemaEditor>
              </div>
              <Button disabled={processing}>Submit</Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </Skeleton>
  );
}
