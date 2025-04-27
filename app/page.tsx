"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, CheckCircle2 } from "lucide-react"

export default function HealthPredictionApp() {
  const [submissionCount, setSubmissionCount] = useState(0)
  const [activeTab, setActiveTab] = useState("appointment")
  const [showResults, setShowResults] = useState(false)
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    scholarship: false,
    hypertension: false,
    diabetes: false,
    heartDisease: false,
    asthma: false,
    depression: false,
    backProblems: false,
    alcoholism: false,
    handicap: false,
    smsReceived: false,
    waitingDays: "",
    neighbourhood: "",
    medications: "",
    otherConditions: "",
    symptoms: {
      anxietyDisorders: false,
      cancer: false,
      kidneyDisease: false,
      liverDisease: false,
      stroke: false,
      epilepsy: false,
      osteoporosis: false,
    },
  })
  const [prediction, setPrediction] = useState({
    willShowUp: false,
    esiLevel: 0,
  })

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target

    if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: checked,
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  const handleSymptomChange = (symptom, checked) => {
    setFormData({
      ...formData,
      symptoms: {
        ...formData.symptoms,
        [symptom]: checked,
      },
    })
  }

  const handleSelectChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Increment submission counter
    setSubmissionCount((prevCount) => prevCount + 1)

    // Count selected conditions and symptoms
    const conditionCount = Object.entries(formData).filter(
      ([key, value]) => typeof value === "boolean" && value === true && key !== "smsReceived",
    ).length

    const symptomCount = Object.values(formData.symptoms).filter((value) => value === true).length

    const totalSelections = conditionCount + symptomCount

    // Determine show-up prediction (alternating 50/50)
    // Even count = will show up, Odd count = will not show up
    const willShowUp = submissionCount % 2 === 0

    // Determine ESI level (more selections = lower ESI, meaning less severe)
    // ESI scale: 1 (most severe) to 5 (least severe)
    let esiLevel
    if (totalSelections >= 8) esiLevel = 5
    else if (totalSelections >= 6) esiLevel = 4
    else if (totalSelections >= 4) esiLevel = 3
    else if (totalSelections >= 2) esiLevel = 2
    else esiLevel = 1

    setPrediction({
      willShowUp,
      esiLevel,
    })

    setShowResults(true)
  }

  const getEsiColor = (level) => {
    switch (level) {
      case 1:
        return "text-red-600 bg-red-100"
      case 2:
        return "text-orange-600 bg-orange-100"
      case 3:
        return "text-yellow-600 bg-yellow-100"
      case 4:
        return "text-blue-600 bg-blue-100"
      case 5:
        return "text-green-600 bg-green-100"
      default:
        return ""
    }
  }

  const resetForm = () => {
    setFormData({
      age: "",
      gender: "",
      scholarship: false,
      hypertension: false,
      diabetes: false,
      heartDisease: false,
      asthma: false,
      depression: false,
      backProblems: false,
      alcoholism: false,
      handicap: false,
      smsReceived: false,
      waitingDays: "",
      neighbourhood: "",
      medications: "",
      otherConditions: "",
      symptoms: {
        anxietyDisorders: false,
        cancer: false,
        kidneyDisease: false,
        liverDisease: false,
        stroke: false,
        epilepsy: false,
        osteoporosis: false,
      },
    })
    setShowResults(false)
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-teal-700">Sahhty Flow Health Prediction</h1>

      <Tabs
        defaultValue="appointment"
        className="w-full max-w-4xl mx-auto"
        onValueChange={setActiveTab}
        value={activeTab}
      >
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="appointment">Appointment Prediction</TabsTrigger>
          <TabsTrigger value="esi">ESI Prediction</TabsTrigger>
        </TabsList>

        <TabsContent value="appointment" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Appointment Show-Up Prediction</CardTitle>
              <CardDescription>
                Enter your health and demographic information to predict appointment attendance
              </CardDescription>
            </CardHeader>

            {!showResults ? (
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="age">Age</Label>
                      <Input
                        id="age"
                        name="age"
                        type="number"
                        placeholder="Enter your age"
                        value={formData.age}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="gender">Gender</Label>
                      <Select
                        onValueChange={(value) => handleSelectChange("gender", value)}
                        value={formData.gender}
                        required
                      >
                        <SelectTrigger id="gender">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="waitingDays">Waiting Days</Label>
                      <Input
                        id="waitingDays"
                        name="waitingDays"
                        type="number"
                        placeholder="Number of waiting days"
                        value={formData.waitingDays}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="neighbourhood">Neighbourhood</Label>
                      <Input
                        id="neighbourhood"
                        name="neighbourhood"
                        placeholder="Your neighbourhood"
                        value={formData.neighbourhood}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label>Health Conditions</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="scholarship"
                          name="scholarship"
                          checked={formData.scholarship}
                          onCheckedChange={(checked) =>
                            handleInputChange({ target: { name: "scholarship", type: "checkbox", checked } })
                          }
                        />
                        <Label htmlFor="scholarship">Scholarship</Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="hypertension"
                          name="hypertension"
                          checked={formData.hypertension}
                          onCheckedChange={(checked) =>
                            handleInputChange({ target: { name: "hypertension", type: "checkbox", checked } })
                          }
                        />
                        <Label htmlFor="hypertension">Hypertension</Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="diabetes"
                          name="diabetes"
                          checked={formData.diabetes}
                          onCheckedChange={(checked) =>
                            handleInputChange({ target: { name: "diabetes", type: "checkbox", checked } })
                          }
                        />
                        <Label htmlFor="diabetes">Diabetes</Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="alcoholism"
                          name="alcoholism"
                          checked={formData.alcoholism}
                          onCheckedChange={(checked) =>
                            handleInputChange({ target: { name: "alcoholism", type: "checkbox", checked } })
                          }
                        />
                        <Label htmlFor="alcoholism">Alcoholism</Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="handicap"
                          name="handicap"
                          checked={formData.handicap}
                          onCheckedChange={(checked) =>
                            handleInputChange({ target: { name: "handicap", type: "checkbox", checked } })
                          }
                        />
                        <Label htmlFor="handicap">Handicap</Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="smsReceived"
                          name="smsReceived"
                          checked={formData.smsReceived}
                          onCheckedChange={(checked) =>
                            handleInputChange({ target: { name: "smsReceived", type: "checkbox", checked } })
                          }
                        />
                        <Label htmlFor="smsReceived">SMS Received</Label>
                      </div>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="flex justify-between">
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Reset
                  </Button>
                  <Button type="submit">Predict</Button>
                </CardFooter>
              </form>
            ) : (
              <CardContent className="space-y-6">
                <div className="flex flex-col items-center justify-center p-6 border rounded-lg">
                  <div className="text-2xl font-bold mb-4">Prediction Result</div>

                  {prediction.willShowUp ? (
                    <div className="flex items-center text-green-600">
                      <CheckCircle2 className="h-8 w-8 mr-2" />
                      <span className="text-xl font-semibold">Will show up</span>
                    </div>
                  ) : (
                    <div className="flex items-center text-red-600">
                      <AlertCircle className="h-8 w-8 mr-2" />
                      <span className="text-xl font-semibold">Will NOT show up</span>
                    </div>
                  )}

                  <Button
                    className="mt-6"
                    onClick={() => {
                      resetForm()
                    }}
                  >
                    Make Another Prediction
                  </Button>
                </div>
              </CardContent>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="esi" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Emergency Severity Index (ESI) Prediction</CardTitle>
              <CardDescription>Enter your health information to predict your emergency severity level</CardDescription>
            </CardHeader>

            {!showResults ? (
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="age-esi">Age</Label>
                      <Input
                        id="age-esi"
                        name="age"
                        type="number"
                        placeholder="Enter your age"
                        value={formData.age}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="gender-esi">Gender</Label>
                      <Select
                        onValueChange={(value) => handleSelectChange("gender", value)}
                        value={formData.gender}
                        required
                      >
                        <SelectTrigger id="gender-esi">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label>Health Conditions</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="hypertension-esi"
                          name="hypertension"
                          checked={formData.hypertension}
                          onCheckedChange={(checked) =>
                            handleInputChange({ target: { name: "hypertension", type: "checkbox", checked } })
                          }
                        />
                        <Label htmlFor="hypertension-esi">Hypertension</Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="diabetes-esi"
                          name="diabetes"
                          checked={formData.diabetes}
                          onCheckedChange={(checked) =>
                            handleInputChange({ target: { name: "diabetes", type: "checkbox", checked } })
                          }
                        />
                        <Label htmlFor="diabetes-esi">Diabetes</Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="heartDisease"
                          name="heartDisease"
                          checked={formData.heartDisease}
                          onCheckedChange={(checked) =>
                            handleInputChange({ target: { name: "heartDisease", type: "checkbox", checked } })
                          }
                        />
                        <Label htmlFor="heartDisease">Heart Disease</Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="asthma"
                          name="asthma"
                          checked={formData.asthma}
                          onCheckedChange={(checked) =>
                            handleInputChange({ target: { name: "asthma", type: "checkbox", checked } })
                          }
                        />
                        <Label htmlFor="asthma">Asthma</Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="depression"
                          name="depression"
                          checked={formData.depression}
                          onCheckedChange={(checked) =>
                            handleInputChange({ target: { name: "depression", type: "checkbox", checked } })
                          }
                        />
                        <Label htmlFor="depression">Depression</Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="backProblems"
                          name="backProblems"
                          checked={formData.backProblems}
                          onCheckedChange={(checked) =>
                            handleInputChange({ target: { name: "backProblems", type: "checkbox", checked } })
                          }
                        />
                        <Label htmlFor="backProblems">Back Problems</Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="alcoholism-esi"
                          name="alcoholism"
                          checked={formData.alcoholism}
                          onCheckedChange={(checked) =>
                            handleInputChange({ target: { name: "alcoholism", type: "checkbox", checked } })
                          }
                        />
                        <Label htmlFor="alcoholism-esi">Alcoholism</Label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label>Symptoms or Medical History</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="anxietyDisorders"
                          checked={formData.symptoms.anxietyDisorders}
                          onCheckedChange={(checked) => handleSymptomChange("anxietyDisorders", checked)}
                        />
                        <Label htmlFor="anxietyDisorders">Anxiety Disorders</Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="cancer"
                          checked={formData.symptoms.cancer}
                          onCheckedChange={(checked) => handleSymptomChange("cancer", checked)}
                        />
                        <Label htmlFor="cancer">Cancer</Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="kidneyDisease"
                          checked={formData.symptoms.kidneyDisease}
                          onCheckedChange={(checked) => handleSymptomChange("kidneyDisease", checked)}
                        />
                        <Label htmlFor="kidneyDisease">Kidney Disease</Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="liverDisease"
                          checked={formData.symptoms.liverDisease}
                          onCheckedChange={(checked) => handleSymptomChange("liverDisease", checked)}
                        />
                        <Label htmlFor="liverDisease">Liver Disease</Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="stroke"
                          checked={formData.symptoms.stroke}
                          onCheckedChange={(checked) => handleSymptomChange("stroke", checked)}
                        />
                        <Label htmlFor="stroke">Stroke/Brain Injuries</Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="epilepsy"
                          checked={formData.symptoms.epilepsy}
                          onCheckedChange={(checked) => handleSymptomChange("epilepsy", checked)}
                        />
                        <Label htmlFor="epilepsy">Epilepsy</Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="osteoporosis"
                          checked={formData.symptoms.osteoporosis}
                          onCheckedChange={(checked) => handleSymptomChange("osteoporosis", checked)}
                        />
                        <Label htmlFor="osteoporosis">Osteoporosis</Label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="medications">Medications</Label>
                    <Textarea
                      id="medications"
                      name="medications"
                      placeholder="List any medications you are currently taking"
                      value={formData.medications}
                      onChange={handleInputChange}
                    />
                  </div>
                </CardContent>

                <CardFooter className="flex justify-between">
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Reset
                  </Button>
                  <Button type="submit">Predict ESI</Button>
                </CardFooter>
              </form>
            ) : (
              <CardContent className="space-y-6">
                <div className="flex flex-col items-center justify-center p-6 border rounded-lg">
                  <div className="text-2xl font-bold mb-4">ESI Prediction Result</div>

                  <div
                    className={`flex items-center justify-center w-24 h-24 rounded-full ${getEsiColor(prediction.esiLevel)} mb-4`}
                  >
                    <span className="text-3xl font-bold">{prediction.esiLevel}</span>
                  </div>

                  <div className="text-center">
                    <p className="text-lg font-medium mb-2">Emergency Severity Index: Level {prediction.esiLevel}</p>
                    <p className="text-sm text-gray-600">
                      {prediction.esiLevel === 1 && "Requires immediate life-saving intervention"}
                      {prediction.esiLevel === 2 && "High risk situation, cannot wait"}
                      {prediction.esiLevel === 3 && "Urgent, requires multiple resources"}
                      {prediction.esiLevel === 4 && "Less urgent, requires one resource"}
                      {prediction.esiLevel === 5 && "Non-urgent, requires no resources"}
                    </p>
                  </div>

                  <Button
                    className="mt-6"
                    onClick={() => {
                      resetForm()
                    }}
                  >
                    Make Another Prediction
                  </Button>
                </div>
              </CardContent>
            )}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
