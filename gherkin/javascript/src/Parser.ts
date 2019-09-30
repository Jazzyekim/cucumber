// This file is generated. Do not edit! Edit gherkin-javascript.razor instead.
import {
  ParserException,
  CompositeParserException,
  UnexpectedTokenException,
  UnexpectedEOFException,
  AstBuilderException,
  NoSuchLanguageException,
} from './Errors'
import AstBuilder from './AstBuilder'
import Token from './Token'
import TokenScanner from './TokenScanner'
import TokenMatcher from './TokenMatcher'

export enum TokenType {
  None,
  EOF,
  Empty,
  Comment,
  TagLine,
  FeatureLine,
  RuleLine,
  BackgroundLine,
  ScenarioLine,
  ExamplesLine,
  StepLine,
  DocStringSeparator,
  TableRow,
  Language,
  Other,
}

export enum RuleType {
  None,
  _EOF, // #EOF
  _Empty, // #Empty
  _Comment, // #Comment
  _TagLine, // #TagLine
  _FeatureLine, // #FeatureLine
  _RuleLine, // #RuleLine
  _BackgroundLine, // #BackgroundLine
  _ScenarioLine, // #ScenarioLine
  _ExamplesLine, // #ExamplesLine
  _StepLine, // #StepLine
  _DocStringSeparator, // #DocStringSeparator
  _TableRow, // #TableRow
  _Language, // #Language
  _Other, // #Other
  GherkinDocument, // GherkinDocument! := Feature?
  Feature, // Feature! := FeatureHeader Background? ScenarioDefinition* Rule*
  FeatureHeader, // FeatureHeader! := #Language? Tags? #FeatureLine DescriptionHelper
  Rule, // Rule! := RuleHeader Background? ScenarioDefinition*
  RuleHeader, // RuleHeader! := #RuleLine DescriptionHelper
  Background, // Background! := #BackgroundLine DescriptionHelper Step*
  ScenarioDefinition, // ScenarioDefinition! := Tags? Scenario
  Scenario, // Scenario! := #ScenarioLine DescriptionHelper Step* ExamplesDefinition*
  ExamplesDefinition, // ExamplesDefinition! [#Empty|#Comment|#TagLine-&gt;#ExamplesLine] := Tags? Examples
  Examples, // Examples! := #ExamplesLine DescriptionHelper ExamplesTable?
  ExamplesTable, // ExamplesTable! := #TableRow #TableRow*
  Step, // Step! := #StepLine StepArg?
  StepArg, // StepArg := (DataTable | DocString)
  DataTable, // DataTable! := #TableRow+
  DocString, // DocString! := #DocStringSeparator #Other* #DocStringSeparator
  Tags, // Tags! := #TagLine+
  DescriptionHelper, // DescriptionHelper := #Empty* Description? #Comment*
  Description, // Description! := #Other+
}

interface Context {
  tokenScanner: TokenScanner
  tokenMatcher: TokenMatcher
  tokenQueue: Token[]
  errors: Error[]
}

export default class Parser {
  public stopAtFirstError: boolean = false
  private context: Context

  constructor(private readonly builder: AstBuilder = new AstBuilder()) {}

  public parse(
    tokenScanner: TokenScanner | string,
    tokenMatcher: TokenMatcher = new TokenMatcher()
  ) {
    if (typeof tokenScanner === 'string') {
      tokenScanner = new TokenScanner(tokenScanner)
    }
    this.builder.reset()
    tokenMatcher.reset()
    this.context = {
      tokenScanner,
      tokenMatcher,
      tokenQueue: [],
      errors: [],
    }
    this.startRule(this.context, RuleType.GherkinDocument)
    let state = 0
    let token = null
    while (true) {
      token = this.readToken(this.context)
      state = this.matchToken(state, token, this.context)
      if (token.isEof) {
        break
      }
    }

    this.endRule(this.context, RuleType.GherkinDocument)

    if (this.context.errors.length > 0) {
      throw CompositeParserException.create(this.context.errors)
    }

    return this.getResult()
  }

  private addError(context: Context, error: Error) {
    context.errors.push(error)
    if (context.errors.length > 10) {
      throw CompositeParserException.create(context.errors)
    }
  }

  private startRule(context: Context, ruleType: RuleType) {
    this.handleAstError(context, () => this.builder.startRule(ruleType))
  }

  private endRule(context: Context, ruleType: RuleType) {
    this.handleAstError(context, () => this.builder.endRule(ruleType))
  }

  private build(context: Context, token: Token) {
    this.handleAstError(context, () => this.builder.build(token))
  }

  private getResult() {
    return this.builder.getResult()
  }

  private handleAstError(context: Context, action: () => any) {
    this.handleExternalError(context, true, action)
  }

  private handleExternalError<T>(
    context: Context,
    defaultValue: T,
    action: () => T
  ) {
    if (this.stopAtFirstError) {
      return action()
    }
    try {
      return action()
    } catch (e) {
      if (e instanceof CompositeParserException) {
        e.errors.forEach((error: Error) => this.addError(context, error))
      } else if (
        e instanceof ParserException ||
        e instanceof AstBuilderException ||
        e instanceof UnexpectedTokenException ||
        e instanceof NoSuchLanguageException
      ) {
        this.addError(context, e)
      } else {
        throw e
      }
    }
    return defaultValue
  }

  private readToken(context: Context) {
    return context.tokenQueue.length > 0
      ? context.tokenQueue.shift()
      : context.tokenScanner.read()
  }

  private matchToken(state: number, token: Token, context: Context) {
    switch (state) {
      case 0:
        return this.matchTokenAt_0(token, context)
      case 1:
        return this.matchTokenAt_1(token, context)
      case 2:
        return this.matchTokenAt_2(token, context)
      case 3:
        return this.matchTokenAt_3(token, context)
      case 4:
        return this.matchTokenAt_4(token, context)
      case 5:
        return this.matchTokenAt_5(token, context)
      case 6:
        return this.matchTokenAt_6(token, context)
      case 7:
        return this.matchTokenAt_7(token, context)
      case 8:
        return this.matchTokenAt_8(token, context)
      case 9:
        return this.matchTokenAt_9(token, context)
      case 10:
        return this.matchTokenAt_10(token, context)
      case 11:
        return this.matchTokenAt_11(token, context)
      case 12:
        return this.matchTokenAt_12(token, context)
      case 13:
        return this.matchTokenAt_13(token, context)
      case 14:
        return this.matchTokenAt_14(token, context)
      case 15:
        return this.matchTokenAt_15(token, context)
      case 16:
        return this.matchTokenAt_16(token, context)
      case 17:
        return this.matchTokenAt_17(token, context)
      case 18:
        return this.matchTokenAt_18(token, context)
      case 19:
        return this.matchTokenAt_19(token, context)
      case 20:
        return this.matchTokenAt_20(token, context)
      case 21:
        return this.matchTokenAt_21(token, context)
      case 22:
        return this.matchTokenAt_22(token, context)
      case 23:
        return this.matchTokenAt_23(token, context)
      case 24:
        return this.matchTokenAt_24(token, context)
      case 25:
        return this.matchTokenAt_25(token, context)
      case 26:
        return this.matchTokenAt_26(token, context)
      case 27:
        return this.matchTokenAt_27(token, context)
      case 28:
        return this.matchTokenAt_28(token, context)
      case 29:
        return this.matchTokenAt_29(token, context)
      case 30:
        return this.matchTokenAt_30(token, context)
      case 31:
        return this.matchTokenAt_31(token, context)
      case 32:
        return this.matchTokenAt_32(token, context)
      case 33:
        return this.matchTokenAt_33(token, context)
      case 34:
        return this.matchTokenAt_34(token, context)
      case 35:
        return this.matchTokenAt_35(token, context)
      case 36:
        return this.matchTokenAt_36(token, context)
      case 37:
        return this.matchTokenAt_37(token, context)
      case 38:
        return this.matchTokenAt_38(token, context)
      case 39:
        return this.matchTokenAt_39(token, context)
      case 40:
        return this.matchTokenAt_40(token, context)
      case 42:
        return this.matchTokenAt_42(token, context)
      case 43:
        return this.matchTokenAt_43(token, context)
      case 44:
        return this.matchTokenAt_44(token, context)
      case 45:
        return this.matchTokenAt_45(token, context)
      case 46:
        return this.matchTokenAt_46(token, context)
      case 47:
        return this.matchTokenAt_47(token, context)
      case 48:
        return this.matchTokenAt_48(token, context)
      case 49:
        return this.matchTokenAt_49(token, context)
      default:
        throw new Error('Unknown state: ' + state)
    }
  }

  // Start
  private matchTokenAt_0(token: Token, context: Context) {
    if (this.match_EOF(context, token)) {
      this.build(context, token)
      return 41
    }
    if (this.match_Language(context, token)) {
      this.startRule(context, RuleType.Feature)
      this.startRule(context, RuleType.FeatureHeader)
      this.build(context, token)
      return 1
    }
    if (this.match_TagLine(context, token)) {
      this.startRule(context, RuleType.Feature)
      this.startRule(context, RuleType.FeatureHeader)
      this.startRule(context, RuleType.Tags)
      this.build(context, token)
      return 2
    }
    if (this.match_FeatureLine(context, token)) {
      this.startRule(context, RuleType.Feature)
      this.startRule(context, RuleType.FeatureHeader)
      this.build(context, token)
      return 3
    }
    if (this.match_Comment(context, token)) {
      this.build(context, token)
      return 0
    }
    if (this.match_Empty(context, token)) {
      this.build(context, token)
      return 0
    }

    const stateComment = 'State: 0 - Start'
    token.detach()
    const expectedTokens = [
      '#EOF',
      '#Language',
      '#TagLine',
      '#FeatureLine',
      '#Comment',
      '#Empty',
    ]
    const error = token.isEof
      ? UnexpectedEOFException.create(token, expectedTokens, stateComment)
      : UnexpectedTokenException.create(token, expectedTokens, stateComment)
    if (this.stopAtFirstError) {
      throw error
    }
    this.addError(context, error)
    return 0
  }

  // GherkinDocument:0>Feature:0>FeatureHeader:0>#Language:0
  private matchTokenAt_1(token: Token, context: Context) {
    if (this.match_TagLine(context, token)) {
      this.startRule(context, RuleType.Tags)
      this.build(context, token)
      return 2
    }
    if (this.match_FeatureLine(context, token)) {
      this.build(context, token)
      return 3
    }
    if (this.match_Comment(context, token)) {
      this.build(context, token)
      return 1
    }
    if (this.match_Empty(context, token)) {
      this.build(context, token)
      return 1
    }

    const stateComment =
      'State: 1 - GherkinDocument:0>Feature:0>FeatureHeader:0>#Language:0'
    token.detach()
    const expectedTokens = ['#TagLine', '#FeatureLine', '#Comment', '#Empty']
    const error = token.isEof
      ? UnexpectedEOFException.create(token, expectedTokens, stateComment)
      : UnexpectedTokenException.create(token, expectedTokens, stateComment)
    if (this.stopAtFirstError) {
      throw error
    }
    this.addError(context, error)
    return 1
  }

  // GherkinDocument:0>Feature:0>FeatureHeader:1>Tags:0>#TagLine:0
  private matchTokenAt_2(token: Token, context: Context) {
    if (this.match_TagLine(context, token)) {
      this.build(context, token)
      return 2
    }
    if (this.match_FeatureLine(context, token)) {
      this.endRule(context, RuleType.Tags)
      this.build(context, token)
      return 3
    }
    if (this.match_Comment(context, token)) {
      this.build(context, token)
      return 2
    }
    if (this.match_Empty(context, token)) {
      this.build(context, token)
      return 2
    }

    const stateComment =
      'State: 2 - GherkinDocument:0>Feature:0>FeatureHeader:1>Tags:0>#TagLine:0'
    token.detach()
    const expectedTokens = ['#TagLine', '#FeatureLine', '#Comment', '#Empty']
    const error = token.isEof
      ? UnexpectedEOFException.create(token, expectedTokens, stateComment)
      : UnexpectedTokenException.create(token, expectedTokens, stateComment)
    if (this.stopAtFirstError) {
      throw error
    }
    this.addError(context, error)
    return 2
  }

  // GherkinDocument:0>Feature:0>FeatureHeader:2>#FeatureLine:0
  private matchTokenAt_3(token: Token, context: Context) {
    if (this.match_EOF(context, token)) {
      this.endRule(context, RuleType.FeatureHeader)
      this.endRule(context, RuleType.Feature)
      this.build(context, token)
      return 41
    }
    if (this.match_Empty(context, token)) {
      this.build(context, token)
      return 3
    }
    if (this.match_Comment(context, token)) {
      this.build(context, token)
      return 5
    }
    if (this.match_BackgroundLine(context, token)) {
      this.endRule(context, RuleType.FeatureHeader)
      this.startRule(context, RuleType.Background)
      this.build(context, token)
      return 6
    }
    if (this.match_TagLine(context, token)) {
      this.endRule(context, RuleType.FeatureHeader)
      this.startRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.Tags)
      this.build(context, token)
      return 11
    }
    if (this.match_ScenarioLine(context, token)) {
      this.endRule(context, RuleType.FeatureHeader)
      this.startRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.Scenario)
      this.build(context, token)
      return 12
    }
    if (this.match_RuleLine(context, token)) {
      this.endRule(context, RuleType.FeatureHeader)
      this.startRule(context, RuleType.Rule)
      this.startRule(context, RuleType.RuleHeader)
      this.build(context, token)
      return 22
    }
    if (this.match_Other(context, token)) {
      this.startRule(context, RuleType.Description)
      this.build(context, token)
      return 4
    }

    const stateComment =
      'State: 3 - GherkinDocument:0>Feature:0>FeatureHeader:2>#FeatureLine:0'
    token.detach()
    const expectedTokens = [
      '#EOF',
      '#Empty',
      '#Comment',
      '#BackgroundLine',
      '#TagLine',
      '#ScenarioLine',
      '#RuleLine',
      '#Other',
    ]
    const error = token.isEof
      ? UnexpectedEOFException.create(token, expectedTokens, stateComment)
      : UnexpectedTokenException.create(token, expectedTokens, stateComment)
    if (this.stopAtFirstError) {
      throw error
    }
    this.addError(context, error)
    return 3
  }

  // GherkinDocument:0>Feature:0>FeatureHeader:3>DescriptionHelper:1>Description:0>#Other:0
  private matchTokenAt_4(token: Token, context: Context) {
    if (this.match_EOF(context, token)) {
      this.endRule(context, RuleType.Description)
      this.endRule(context, RuleType.FeatureHeader)
      this.endRule(context, RuleType.Feature)
      this.build(context, token)
      return 41
    }
    if (this.match_Comment(context, token)) {
      this.endRule(context, RuleType.Description)
      this.build(context, token)
      return 5
    }
    if (this.match_BackgroundLine(context, token)) {
      this.endRule(context, RuleType.Description)
      this.endRule(context, RuleType.FeatureHeader)
      this.startRule(context, RuleType.Background)
      this.build(context, token)
      return 6
    }
    if (this.match_TagLine(context, token)) {
      this.endRule(context, RuleType.Description)
      this.endRule(context, RuleType.FeatureHeader)
      this.startRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.Tags)
      this.build(context, token)
      return 11
    }
    if (this.match_ScenarioLine(context, token)) {
      this.endRule(context, RuleType.Description)
      this.endRule(context, RuleType.FeatureHeader)
      this.startRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.Scenario)
      this.build(context, token)
      return 12
    }
    if (this.match_RuleLine(context, token)) {
      this.endRule(context, RuleType.Description)
      this.endRule(context, RuleType.FeatureHeader)
      this.startRule(context, RuleType.Rule)
      this.startRule(context, RuleType.RuleHeader)
      this.build(context, token)
      return 22
    }
    if (this.match_Other(context, token)) {
      this.build(context, token)
      return 4
    }

    const stateComment =
      'State: 4 - GherkinDocument:0>Feature:0>FeatureHeader:3>DescriptionHelper:1>Description:0>#Other:0'
    token.detach()
    const expectedTokens = [
      '#EOF',
      '#Comment',
      '#BackgroundLine',
      '#TagLine',
      '#ScenarioLine',
      '#RuleLine',
      '#Other',
    ]
    const error = token.isEof
      ? UnexpectedEOFException.create(token, expectedTokens, stateComment)
      : UnexpectedTokenException.create(token, expectedTokens, stateComment)
    if (this.stopAtFirstError) {
      throw error
    }
    this.addError(context, error)
    return 4
  }

  // GherkinDocument:0>Feature:0>FeatureHeader:3>DescriptionHelper:2>#Comment:0
  private matchTokenAt_5(token: Token, context: Context) {
    if (this.match_EOF(context, token)) {
      this.endRule(context, RuleType.FeatureHeader)
      this.endRule(context, RuleType.Feature)
      this.build(context, token)
      return 41
    }
    if (this.match_Comment(context, token)) {
      this.build(context, token)
      return 5
    }
    if (this.match_BackgroundLine(context, token)) {
      this.endRule(context, RuleType.FeatureHeader)
      this.startRule(context, RuleType.Background)
      this.build(context, token)
      return 6
    }
    if (this.match_TagLine(context, token)) {
      this.endRule(context, RuleType.FeatureHeader)
      this.startRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.Tags)
      this.build(context, token)
      return 11
    }
    if (this.match_ScenarioLine(context, token)) {
      this.endRule(context, RuleType.FeatureHeader)
      this.startRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.Scenario)
      this.build(context, token)
      return 12
    }
    if (this.match_RuleLine(context, token)) {
      this.endRule(context, RuleType.FeatureHeader)
      this.startRule(context, RuleType.Rule)
      this.startRule(context, RuleType.RuleHeader)
      this.build(context, token)
      return 22
    }
    if (this.match_Empty(context, token)) {
      this.build(context, token)
      return 5
    }

    const stateComment =
      'State: 5 - GherkinDocument:0>Feature:0>FeatureHeader:3>DescriptionHelper:2>#Comment:0'
    token.detach()
    const expectedTokens = [
      '#EOF',
      '#Comment',
      '#BackgroundLine',
      '#TagLine',
      '#ScenarioLine',
      '#RuleLine',
      '#Empty',
    ]
    const error = token.isEof
      ? UnexpectedEOFException.create(token, expectedTokens, stateComment)
      : UnexpectedTokenException.create(token, expectedTokens, stateComment)
    if (this.stopAtFirstError) {
      throw error
    }
    this.addError(context, error)
    return 5
  }

  // GherkinDocument:0>Feature:1>Background:0>#BackgroundLine:0
  private matchTokenAt_6(token: Token, context: Context) {
    if (this.match_EOF(context, token)) {
      this.endRule(context, RuleType.Background)
      this.endRule(context, RuleType.Feature)
      this.build(context, token)
      return 41
    }
    if (this.match_Empty(context, token)) {
      this.build(context, token)
      return 6
    }
    if (this.match_Comment(context, token)) {
      this.build(context, token)
      return 8
    }
    if (this.match_StepLine(context, token)) {
      this.startRule(context, RuleType.Step)
      this.build(context, token)
      return 9
    }
    if (this.match_TagLine(context, token)) {
      this.endRule(context, RuleType.Background)
      this.startRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.Tags)
      this.build(context, token)
      return 11
    }
    if (this.match_ScenarioLine(context, token)) {
      this.endRule(context, RuleType.Background)
      this.startRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.Scenario)
      this.build(context, token)
      return 12
    }
    if (this.match_RuleLine(context, token)) {
      this.endRule(context, RuleType.Background)
      this.startRule(context, RuleType.Rule)
      this.startRule(context, RuleType.RuleHeader)
      this.build(context, token)
      return 22
    }
    if (this.match_Other(context, token)) {
      this.startRule(context, RuleType.Description)
      this.build(context, token)
      return 7
    }

    const stateComment =
      'State: 6 - GherkinDocument:0>Feature:1>Background:0>#BackgroundLine:0'
    token.detach()
    const expectedTokens = [
      '#EOF',
      '#Empty',
      '#Comment',
      '#StepLine',
      '#TagLine',
      '#ScenarioLine',
      '#RuleLine',
      '#Other',
    ]
    const error = token.isEof
      ? UnexpectedEOFException.create(token, expectedTokens, stateComment)
      : UnexpectedTokenException.create(token, expectedTokens, stateComment)
    if (this.stopAtFirstError) {
      throw error
    }
    this.addError(context, error)
    return 6
  }

  // GherkinDocument:0>Feature:1>Background:1>DescriptionHelper:1>Description:0>#Other:0
  private matchTokenAt_7(token: Token, context: Context) {
    if (this.match_EOF(context, token)) {
      this.endRule(context, RuleType.Description)
      this.endRule(context, RuleType.Background)
      this.endRule(context, RuleType.Feature)
      this.build(context, token)
      return 41
    }
    if (this.match_Comment(context, token)) {
      this.endRule(context, RuleType.Description)
      this.build(context, token)
      return 8
    }
    if (this.match_StepLine(context, token)) {
      this.endRule(context, RuleType.Description)
      this.startRule(context, RuleType.Step)
      this.build(context, token)
      return 9
    }
    if (this.match_TagLine(context, token)) {
      this.endRule(context, RuleType.Description)
      this.endRule(context, RuleType.Background)
      this.startRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.Tags)
      this.build(context, token)
      return 11
    }
    if (this.match_ScenarioLine(context, token)) {
      this.endRule(context, RuleType.Description)
      this.endRule(context, RuleType.Background)
      this.startRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.Scenario)
      this.build(context, token)
      return 12
    }
    if (this.match_RuleLine(context, token)) {
      this.endRule(context, RuleType.Description)
      this.endRule(context, RuleType.Background)
      this.startRule(context, RuleType.Rule)
      this.startRule(context, RuleType.RuleHeader)
      this.build(context, token)
      return 22
    }
    if (this.match_Other(context, token)) {
      this.build(context, token)
      return 7
    }

    const stateComment =
      'State: 7 - GherkinDocument:0>Feature:1>Background:1>DescriptionHelper:1>Description:0>#Other:0'
    token.detach()
    const expectedTokens = [
      '#EOF',
      '#Comment',
      '#StepLine',
      '#TagLine',
      '#ScenarioLine',
      '#RuleLine',
      '#Other',
    ]
    const error = token.isEof
      ? UnexpectedEOFException.create(token, expectedTokens, stateComment)
      : UnexpectedTokenException.create(token, expectedTokens, stateComment)
    if (this.stopAtFirstError) {
      throw error
    }
    this.addError(context, error)
    return 7
  }

  // GherkinDocument:0>Feature:1>Background:1>DescriptionHelper:2>#Comment:0
  private matchTokenAt_8(token: Token, context: Context) {
    if (this.match_EOF(context, token)) {
      this.endRule(context, RuleType.Background)
      this.endRule(context, RuleType.Feature)
      this.build(context, token)
      return 41
    }
    if (this.match_Comment(context, token)) {
      this.build(context, token)
      return 8
    }
    if (this.match_StepLine(context, token)) {
      this.startRule(context, RuleType.Step)
      this.build(context, token)
      return 9
    }
    if (this.match_TagLine(context, token)) {
      this.endRule(context, RuleType.Background)
      this.startRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.Tags)
      this.build(context, token)
      return 11
    }
    if (this.match_ScenarioLine(context, token)) {
      this.endRule(context, RuleType.Background)
      this.startRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.Scenario)
      this.build(context, token)
      return 12
    }
    if (this.match_RuleLine(context, token)) {
      this.endRule(context, RuleType.Background)
      this.startRule(context, RuleType.Rule)
      this.startRule(context, RuleType.RuleHeader)
      this.build(context, token)
      return 22
    }
    if (this.match_Empty(context, token)) {
      this.build(context, token)
      return 8
    }

    const stateComment =
      'State: 8 - GherkinDocument:0>Feature:1>Background:1>DescriptionHelper:2>#Comment:0'
    token.detach()
    const expectedTokens = [
      '#EOF',
      '#Comment',
      '#StepLine',
      '#TagLine',
      '#ScenarioLine',
      '#RuleLine',
      '#Empty',
    ]
    const error = token.isEof
      ? UnexpectedEOFException.create(token, expectedTokens, stateComment)
      : UnexpectedTokenException.create(token, expectedTokens, stateComment)
    if (this.stopAtFirstError) {
      throw error
    }
    this.addError(context, error)
    return 8
  }

  // GherkinDocument:0>Feature:1>Background:2>Step:0>#StepLine:0
  private matchTokenAt_9(token: Token, context: Context) {
    if (this.match_EOF(context, token)) {
      this.endRule(context, RuleType.Step)
      this.endRule(context, RuleType.Background)
      this.endRule(context, RuleType.Feature)
      this.build(context, token)
      return 41
    }
    if (this.match_TableRow(context, token)) {
      this.startRule(context, RuleType.DataTable)
      this.build(context, token)
      return 10
    }
    if (this.match_DocStringSeparator(context, token)) {
      this.startRule(context, RuleType.DocString)
      this.build(context, token)
      return 48
    }
    if (this.match_StepLine(context, token)) {
      this.endRule(context, RuleType.Step)
      this.startRule(context, RuleType.Step)
      this.build(context, token)
      return 9
    }
    if (this.match_TagLine(context, token)) {
      this.endRule(context, RuleType.Step)
      this.endRule(context, RuleType.Background)
      this.startRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.Tags)
      this.build(context, token)
      return 11
    }
    if (this.match_ScenarioLine(context, token)) {
      this.endRule(context, RuleType.Step)
      this.endRule(context, RuleType.Background)
      this.startRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.Scenario)
      this.build(context, token)
      return 12
    }
    if (this.match_RuleLine(context, token)) {
      this.endRule(context, RuleType.Step)
      this.endRule(context, RuleType.Background)
      this.startRule(context, RuleType.Rule)
      this.startRule(context, RuleType.RuleHeader)
      this.build(context, token)
      return 22
    }
    if (this.match_Comment(context, token)) {
      this.build(context, token)
      return 9
    }
    if (this.match_Empty(context, token)) {
      this.build(context, token)
      return 9
    }

    const stateComment =
      'State: 9 - GherkinDocument:0>Feature:1>Background:2>Step:0>#StepLine:0'
    token.detach()
    const expectedTokens = [
      '#EOF',
      '#TableRow',
      '#DocStringSeparator',
      '#StepLine',
      '#TagLine',
      '#ScenarioLine',
      '#RuleLine',
      '#Comment',
      '#Empty',
    ]
    const error = token.isEof
      ? UnexpectedEOFException.create(token, expectedTokens, stateComment)
      : UnexpectedTokenException.create(token, expectedTokens, stateComment)
    if (this.stopAtFirstError) {
      throw error
    }
    this.addError(context, error)
    return 9
  }

  // GherkinDocument:0>Feature:1>Background:2>Step:1>StepArg:0>__alt0:0>DataTable:0>#TableRow:0
  private matchTokenAt_10(token: Token, context: Context) {
    if (this.match_EOF(context, token)) {
      this.endRule(context, RuleType.DataTable)
      this.endRule(context, RuleType.Step)
      this.endRule(context, RuleType.Background)
      this.endRule(context, RuleType.Feature)
      this.build(context, token)
      return 41
    }
    if (this.match_TableRow(context, token)) {
      this.build(context, token)
      return 10
    }
    if (this.match_StepLine(context, token)) {
      this.endRule(context, RuleType.DataTable)
      this.endRule(context, RuleType.Step)
      this.startRule(context, RuleType.Step)
      this.build(context, token)
      return 9
    }
    if (this.match_TagLine(context, token)) {
      this.endRule(context, RuleType.DataTable)
      this.endRule(context, RuleType.Step)
      this.endRule(context, RuleType.Background)
      this.startRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.Tags)
      this.build(context, token)
      return 11
    }
    if (this.match_ScenarioLine(context, token)) {
      this.endRule(context, RuleType.DataTable)
      this.endRule(context, RuleType.Step)
      this.endRule(context, RuleType.Background)
      this.startRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.Scenario)
      this.build(context, token)
      return 12
    }
    if (this.match_RuleLine(context, token)) {
      this.endRule(context, RuleType.DataTable)
      this.endRule(context, RuleType.Step)
      this.endRule(context, RuleType.Background)
      this.startRule(context, RuleType.Rule)
      this.startRule(context, RuleType.RuleHeader)
      this.build(context, token)
      return 22
    }
    if (this.match_Comment(context, token)) {
      this.build(context, token)
      return 10
    }
    if (this.match_Empty(context, token)) {
      this.build(context, token)
      return 10
    }

    const stateComment =
      'State: 10 - GherkinDocument:0>Feature:1>Background:2>Step:1>StepArg:0>__alt0:0>DataTable:0>#TableRow:0'
    token.detach()
    const expectedTokens = [
      '#EOF',
      '#TableRow',
      '#StepLine',
      '#TagLine',
      '#ScenarioLine',
      '#RuleLine',
      '#Comment',
      '#Empty',
    ]
    const error = token.isEof
      ? UnexpectedEOFException.create(token, expectedTokens, stateComment)
      : UnexpectedTokenException.create(token, expectedTokens, stateComment)
    if (this.stopAtFirstError) {
      throw error
    }
    this.addError(context, error)
    return 10
  }

  // GherkinDocument:0>Feature:2>ScenarioDefinition:0>Tags:0>#TagLine:0
  private matchTokenAt_11(token: Token, context: Context) {
    if (this.match_TagLine(context, token)) {
      this.build(context, token)
      return 11
    }
    if (this.match_ScenarioLine(context, token)) {
      this.endRule(context, RuleType.Tags)
      this.startRule(context, RuleType.Scenario)
      this.build(context, token)
      return 12
    }
    if (this.match_Comment(context, token)) {
      this.build(context, token)
      return 11
    }
    if (this.match_Empty(context, token)) {
      this.build(context, token)
      return 11
    }

    const stateComment =
      'State: 11 - GherkinDocument:0>Feature:2>ScenarioDefinition:0>Tags:0>#TagLine:0'
    token.detach()
    const expectedTokens = ['#TagLine', '#ScenarioLine', '#Comment', '#Empty']
    const error = token.isEof
      ? UnexpectedEOFException.create(token, expectedTokens, stateComment)
      : UnexpectedTokenException.create(token, expectedTokens, stateComment)
    if (this.stopAtFirstError) {
      throw error
    }
    this.addError(context, error)
    return 11
  }

  // GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:0>#ScenarioLine:0
  private matchTokenAt_12(token: Token, context: Context) {
    if (this.match_EOF(context, token)) {
      this.endRule(context, RuleType.Scenario)
      this.endRule(context, RuleType.ScenarioDefinition)
      this.endRule(context, RuleType.Feature)
      this.build(context, token)
      return 41
    }
    if (this.match_Empty(context, token)) {
      this.build(context, token)
      return 12
    }
    if (this.match_Comment(context, token)) {
      this.build(context, token)
      return 14
    }
    if (this.match_StepLine(context, token)) {
      this.startRule(context, RuleType.Step)
      this.build(context, token)
      return 15
    }
    if (this.match_TagLine(context, token)) {
      if (this.lookahead_0(context, token)) {
        this.startRule(context, RuleType.ExamplesDefinition)
        this.startRule(context, RuleType.Tags)
        this.build(context, token)
        return 17
      }
    }
    if (this.match_TagLine(context, token)) {
      this.endRule(context, RuleType.Scenario)
      this.endRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.Tags)
      this.build(context, token)
      return 11
    }
    if (this.match_ExamplesLine(context, token)) {
      this.startRule(context, RuleType.ExamplesDefinition)
      this.startRule(context, RuleType.Examples)
      this.build(context, token)
      return 18
    }
    if (this.match_ScenarioLine(context, token)) {
      this.endRule(context, RuleType.Scenario)
      this.endRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.Scenario)
      this.build(context, token)
      return 12
    }
    if (this.match_RuleLine(context, token)) {
      this.endRule(context, RuleType.Scenario)
      this.endRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.Rule)
      this.startRule(context, RuleType.RuleHeader)
      this.build(context, token)
      return 22
    }
    if (this.match_Other(context, token)) {
      this.startRule(context, RuleType.Description)
      this.build(context, token)
      return 13
    }

    const stateComment =
      'State: 12 - GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:0>#ScenarioLine:0'
    token.detach()
    const expectedTokens = [
      '#EOF',
      '#Empty',
      '#Comment',
      '#StepLine',
      '#TagLine',
      '#ExamplesLine',
      '#ScenarioLine',
      '#RuleLine',
      '#Other',
    ]
    const error = token.isEof
      ? UnexpectedEOFException.create(token, expectedTokens, stateComment)
      : UnexpectedTokenException.create(token, expectedTokens, stateComment)
    if (this.stopAtFirstError) {
      throw error
    }
    this.addError(context, error)
    return 12
  }

  // GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:1>DescriptionHelper:1>Description:0>#Other:0
  private matchTokenAt_13(token: Token, context: Context) {
    if (this.match_EOF(context, token)) {
      this.endRule(context, RuleType.Description)
      this.endRule(context, RuleType.Scenario)
      this.endRule(context, RuleType.ScenarioDefinition)
      this.endRule(context, RuleType.Feature)
      this.build(context, token)
      return 41
    }
    if (this.match_Comment(context, token)) {
      this.endRule(context, RuleType.Description)
      this.build(context, token)
      return 14
    }
    if (this.match_StepLine(context, token)) {
      this.endRule(context, RuleType.Description)
      this.startRule(context, RuleType.Step)
      this.build(context, token)
      return 15
    }
    if (this.match_TagLine(context, token)) {
      if (this.lookahead_0(context, token)) {
        this.endRule(context, RuleType.Description)
        this.startRule(context, RuleType.ExamplesDefinition)
        this.startRule(context, RuleType.Tags)
        this.build(context, token)
        return 17
      }
    }
    if (this.match_TagLine(context, token)) {
      this.endRule(context, RuleType.Description)
      this.endRule(context, RuleType.Scenario)
      this.endRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.Tags)
      this.build(context, token)
      return 11
    }
    if (this.match_ExamplesLine(context, token)) {
      this.endRule(context, RuleType.Description)
      this.startRule(context, RuleType.ExamplesDefinition)
      this.startRule(context, RuleType.Examples)
      this.build(context, token)
      return 18
    }
    if (this.match_ScenarioLine(context, token)) {
      this.endRule(context, RuleType.Description)
      this.endRule(context, RuleType.Scenario)
      this.endRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.Scenario)
      this.build(context, token)
      return 12
    }
    if (this.match_RuleLine(context, token)) {
      this.endRule(context, RuleType.Description)
      this.endRule(context, RuleType.Scenario)
      this.endRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.Rule)
      this.startRule(context, RuleType.RuleHeader)
      this.build(context, token)
      return 22
    }
    if (this.match_Other(context, token)) {
      this.build(context, token)
      return 13
    }

    const stateComment =
      'State: 13 - GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:1>DescriptionHelper:1>Description:0>#Other:0'
    token.detach()
    const expectedTokens = [
      '#EOF',
      '#Comment',
      '#StepLine',
      '#TagLine',
      '#ExamplesLine',
      '#ScenarioLine',
      '#RuleLine',
      '#Other',
    ]
    const error = token.isEof
      ? UnexpectedEOFException.create(token, expectedTokens, stateComment)
      : UnexpectedTokenException.create(token, expectedTokens, stateComment)
    if (this.stopAtFirstError) {
      throw error
    }
    this.addError(context, error)
    return 13
  }

  // GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:1>DescriptionHelper:2>#Comment:0
  private matchTokenAt_14(token: Token, context: Context) {
    if (this.match_EOF(context, token)) {
      this.endRule(context, RuleType.Scenario)
      this.endRule(context, RuleType.ScenarioDefinition)
      this.endRule(context, RuleType.Feature)
      this.build(context, token)
      return 41
    }
    if (this.match_Comment(context, token)) {
      this.build(context, token)
      return 14
    }
    if (this.match_StepLine(context, token)) {
      this.startRule(context, RuleType.Step)
      this.build(context, token)
      return 15
    }
    if (this.match_TagLine(context, token)) {
      if (this.lookahead_0(context, token)) {
        this.startRule(context, RuleType.ExamplesDefinition)
        this.startRule(context, RuleType.Tags)
        this.build(context, token)
        return 17
      }
    }
    if (this.match_TagLine(context, token)) {
      this.endRule(context, RuleType.Scenario)
      this.endRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.Tags)
      this.build(context, token)
      return 11
    }
    if (this.match_ExamplesLine(context, token)) {
      this.startRule(context, RuleType.ExamplesDefinition)
      this.startRule(context, RuleType.Examples)
      this.build(context, token)
      return 18
    }
    if (this.match_ScenarioLine(context, token)) {
      this.endRule(context, RuleType.Scenario)
      this.endRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.Scenario)
      this.build(context, token)
      return 12
    }
    if (this.match_RuleLine(context, token)) {
      this.endRule(context, RuleType.Scenario)
      this.endRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.Rule)
      this.startRule(context, RuleType.RuleHeader)
      this.build(context, token)
      return 22
    }
    if (this.match_Empty(context, token)) {
      this.build(context, token)
      return 14
    }

    const stateComment =
      'State: 14 - GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:1>DescriptionHelper:2>#Comment:0'
    token.detach()
    const expectedTokens = [
      '#EOF',
      '#Comment',
      '#StepLine',
      '#TagLine',
      '#ExamplesLine',
      '#ScenarioLine',
      '#RuleLine',
      '#Empty',
    ]
    const error = token.isEof
      ? UnexpectedEOFException.create(token, expectedTokens, stateComment)
      : UnexpectedTokenException.create(token, expectedTokens, stateComment)
    if (this.stopAtFirstError) {
      throw error
    }
    this.addError(context, error)
    return 14
  }

  // GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:2>Step:0>#StepLine:0
  private matchTokenAt_15(token: Token, context: Context) {
    if (this.match_EOF(context, token)) {
      this.endRule(context, RuleType.Step)
      this.endRule(context, RuleType.Scenario)
      this.endRule(context, RuleType.ScenarioDefinition)
      this.endRule(context, RuleType.Feature)
      this.build(context, token)
      return 41
    }
    if (this.match_TableRow(context, token)) {
      this.startRule(context, RuleType.DataTable)
      this.build(context, token)
      return 16
    }
    if (this.match_DocStringSeparator(context, token)) {
      this.startRule(context, RuleType.DocString)
      this.build(context, token)
      return 46
    }
    if (this.match_StepLine(context, token)) {
      this.endRule(context, RuleType.Step)
      this.startRule(context, RuleType.Step)
      this.build(context, token)
      return 15
    }
    if (this.match_TagLine(context, token)) {
      if (this.lookahead_0(context, token)) {
        this.endRule(context, RuleType.Step)
        this.startRule(context, RuleType.ExamplesDefinition)
        this.startRule(context, RuleType.Tags)
        this.build(context, token)
        return 17
      }
    }
    if (this.match_TagLine(context, token)) {
      this.endRule(context, RuleType.Step)
      this.endRule(context, RuleType.Scenario)
      this.endRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.Tags)
      this.build(context, token)
      return 11
    }
    if (this.match_ExamplesLine(context, token)) {
      this.endRule(context, RuleType.Step)
      this.startRule(context, RuleType.ExamplesDefinition)
      this.startRule(context, RuleType.Examples)
      this.build(context, token)
      return 18
    }
    if (this.match_ScenarioLine(context, token)) {
      this.endRule(context, RuleType.Step)
      this.endRule(context, RuleType.Scenario)
      this.endRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.Scenario)
      this.build(context, token)
      return 12
    }
    if (this.match_RuleLine(context, token)) {
      this.endRule(context, RuleType.Step)
      this.endRule(context, RuleType.Scenario)
      this.endRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.Rule)
      this.startRule(context, RuleType.RuleHeader)
      this.build(context, token)
      return 22
    }
    if (this.match_Comment(context, token)) {
      this.build(context, token)
      return 15
    }
    if (this.match_Empty(context, token)) {
      this.build(context, token)
      return 15
    }

    const stateComment =
      'State: 15 - GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:2>Step:0>#StepLine:0'
    token.detach()
    const expectedTokens = [
      '#EOF',
      '#TableRow',
      '#DocStringSeparator',
      '#StepLine',
      '#TagLine',
      '#ExamplesLine',
      '#ScenarioLine',
      '#RuleLine',
      '#Comment',
      '#Empty',
    ]
    const error = token.isEof
      ? UnexpectedEOFException.create(token, expectedTokens, stateComment)
      : UnexpectedTokenException.create(token, expectedTokens, stateComment)
    if (this.stopAtFirstError) {
      throw error
    }
    this.addError(context, error)
    return 15
  }

  // GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:2>Step:1>StepArg:0>__alt0:0>DataTable:0>#TableRow:0
  private matchTokenAt_16(token: Token, context: Context) {
    if (this.match_EOF(context, token)) {
      this.endRule(context, RuleType.DataTable)
      this.endRule(context, RuleType.Step)
      this.endRule(context, RuleType.Scenario)
      this.endRule(context, RuleType.ScenarioDefinition)
      this.endRule(context, RuleType.Feature)
      this.build(context, token)
      return 41
    }
    if (this.match_TableRow(context, token)) {
      this.build(context, token)
      return 16
    }
    if (this.match_StepLine(context, token)) {
      this.endRule(context, RuleType.DataTable)
      this.endRule(context, RuleType.Step)
      this.startRule(context, RuleType.Step)
      this.build(context, token)
      return 15
    }
    if (this.match_TagLine(context, token)) {
      if (this.lookahead_0(context, token)) {
        this.endRule(context, RuleType.DataTable)
        this.endRule(context, RuleType.Step)
        this.startRule(context, RuleType.ExamplesDefinition)
        this.startRule(context, RuleType.Tags)
        this.build(context, token)
        return 17
      }
    }
    if (this.match_TagLine(context, token)) {
      this.endRule(context, RuleType.DataTable)
      this.endRule(context, RuleType.Step)
      this.endRule(context, RuleType.Scenario)
      this.endRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.Tags)
      this.build(context, token)
      return 11
    }
    if (this.match_ExamplesLine(context, token)) {
      this.endRule(context, RuleType.DataTable)
      this.endRule(context, RuleType.Step)
      this.startRule(context, RuleType.ExamplesDefinition)
      this.startRule(context, RuleType.Examples)
      this.build(context, token)
      return 18
    }
    if (this.match_ScenarioLine(context, token)) {
      this.endRule(context, RuleType.DataTable)
      this.endRule(context, RuleType.Step)
      this.endRule(context, RuleType.Scenario)
      this.endRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.Scenario)
      this.build(context, token)
      return 12
    }
    if (this.match_RuleLine(context, token)) {
      this.endRule(context, RuleType.DataTable)
      this.endRule(context, RuleType.Step)
      this.endRule(context, RuleType.Scenario)
      this.endRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.Rule)
      this.startRule(context, RuleType.RuleHeader)
      this.build(context, token)
      return 22
    }
    if (this.match_Comment(context, token)) {
      this.build(context, token)
      return 16
    }
    if (this.match_Empty(context, token)) {
      this.build(context, token)
      return 16
    }

    const stateComment =
      'State: 16 - GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:2>Step:1>StepArg:0>__alt0:0>DataTable:0>#TableRow:0'
    token.detach()
    const expectedTokens = [
      '#EOF',
      '#TableRow',
      '#StepLine',
      '#TagLine',
      '#ExamplesLine',
      '#ScenarioLine',
      '#RuleLine',
      '#Comment',
      '#Empty',
    ]
    const error = token.isEof
      ? UnexpectedEOFException.create(token, expectedTokens, stateComment)
      : UnexpectedTokenException.create(token, expectedTokens, stateComment)
    if (this.stopAtFirstError) {
      throw error
    }
    this.addError(context, error)
    return 16
  }

  // GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:3>ExamplesDefinition:0>Tags:0>#TagLine:0
  private matchTokenAt_17(token: Token, context: Context) {
    if (this.match_TagLine(context, token)) {
      this.build(context, token)
      return 17
    }
    if (this.match_ExamplesLine(context, token)) {
      this.endRule(context, RuleType.Tags)
      this.startRule(context, RuleType.Examples)
      this.build(context, token)
      return 18
    }
    if (this.match_Comment(context, token)) {
      this.build(context, token)
      return 17
    }
    if (this.match_Empty(context, token)) {
      this.build(context, token)
      return 17
    }

    const stateComment =
      'State: 17 - GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:3>ExamplesDefinition:0>Tags:0>#TagLine:0'
    token.detach()
    const expectedTokens = ['#TagLine', '#ExamplesLine', '#Comment', '#Empty']
    const error = token.isEof
      ? UnexpectedEOFException.create(token, expectedTokens, stateComment)
      : UnexpectedTokenException.create(token, expectedTokens, stateComment)
    if (this.stopAtFirstError) {
      throw error
    }
    this.addError(context, error)
    return 17
  }

  // GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:3>ExamplesDefinition:1>Examples:0>#ExamplesLine:0
  private matchTokenAt_18(token: Token, context: Context) {
    if (this.match_EOF(context, token)) {
      this.endRule(context, RuleType.Examples)
      this.endRule(context, RuleType.ExamplesDefinition)
      this.endRule(context, RuleType.Scenario)
      this.endRule(context, RuleType.ScenarioDefinition)
      this.endRule(context, RuleType.Feature)
      this.build(context, token)
      return 41
    }
    if (this.match_Empty(context, token)) {
      this.build(context, token)
      return 18
    }
    if (this.match_Comment(context, token)) {
      this.build(context, token)
      return 20
    }
    if (this.match_TableRow(context, token)) {
      this.startRule(context, RuleType.ExamplesTable)
      this.build(context, token)
      return 21
    }
    if (this.match_TagLine(context, token)) {
      if (this.lookahead_0(context, token)) {
        this.endRule(context, RuleType.Examples)
        this.endRule(context, RuleType.ExamplesDefinition)
        this.startRule(context, RuleType.ExamplesDefinition)
        this.startRule(context, RuleType.Tags)
        this.build(context, token)
        return 17
      }
    }
    if (this.match_TagLine(context, token)) {
      this.endRule(context, RuleType.Examples)
      this.endRule(context, RuleType.ExamplesDefinition)
      this.endRule(context, RuleType.Scenario)
      this.endRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.Tags)
      this.build(context, token)
      return 11
    }
    if (this.match_ExamplesLine(context, token)) {
      this.endRule(context, RuleType.Examples)
      this.endRule(context, RuleType.ExamplesDefinition)
      this.startRule(context, RuleType.ExamplesDefinition)
      this.startRule(context, RuleType.Examples)
      this.build(context, token)
      return 18
    }
    if (this.match_ScenarioLine(context, token)) {
      this.endRule(context, RuleType.Examples)
      this.endRule(context, RuleType.ExamplesDefinition)
      this.endRule(context, RuleType.Scenario)
      this.endRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.Scenario)
      this.build(context, token)
      return 12
    }
    if (this.match_RuleLine(context, token)) {
      this.endRule(context, RuleType.Examples)
      this.endRule(context, RuleType.ExamplesDefinition)
      this.endRule(context, RuleType.Scenario)
      this.endRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.Rule)
      this.startRule(context, RuleType.RuleHeader)
      this.build(context, token)
      return 22
    }
    if (this.match_Other(context, token)) {
      this.startRule(context, RuleType.Description)
      this.build(context, token)
      return 19
    }

    const stateComment =
      'State: 18 - GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:3>ExamplesDefinition:1>Examples:0>#ExamplesLine:0'
    token.detach()
    const expectedTokens = [
      '#EOF',
      '#Empty',
      '#Comment',
      '#TableRow',
      '#TagLine',
      '#ExamplesLine',
      '#ScenarioLine',
      '#RuleLine',
      '#Other',
    ]
    const error = token.isEof
      ? UnexpectedEOFException.create(token, expectedTokens, stateComment)
      : UnexpectedTokenException.create(token, expectedTokens, stateComment)
    if (this.stopAtFirstError) {
      throw error
    }
    this.addError(context, error)
    return 18
  }

  // GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:3>ExamplesDefinition:1>Examples:1>DescriptionHelper:1>Description:0>#Other:0
  private matchTokenAt_19(token: Token, context: Context) {
    if (this.match_EOF(context, token)) {
      this.endRule(context, RuleType.Description)
      this.endRule(context, RuleType.Examples)
      this.endRule(context, RuleType.ExamplesDefinition)
      this.endRule(context, RuleType.Scenario)
      this.endRule(context, RuleType.ScenarioDefinition)
      this.endRule(context, RuleType.Feature)
      this.build(context, token)
      return 41
    }
    if (this.match_Comment(context, token)) {
      this.endRule(context, RuleType.Description)
      this.build(context, token)
      return 20
    }
    if (this.match_TableRow(context, token)) {
      this.endRule(context, RuleType.Description)
      this.startRule(context, RuleType.ExamplesTable)
      this.build(context, token)
      return 21
    }
    if (this.match_TagLine(context, token)) {
      if (this.lookahead_0(context, token)) {
        this.endRule(context, RuleType.Description)
        this.endRule(context, RuleType.Examples)
        this.endRule(context, RuleType.ExamplesDefinition)
        this.startRule(context, RuleType.ExamplesDefinition)
        this.startRule(context, RuleType.Tags)
        this.build(context, token)
        return 17
      }
    }
    if (this.match_TagLine(context, token)) {
      this.endRule(context, RuleType.Description)
      this.endRule(context, RuleType.Examples)
      this.endRule(context, RuleType.ExamplesDefinition)
      this.endRule(context, RuleType.Scenario)
      this.endRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.Tags)
      this.build(context, token)
      return 11
    }
    if (this.match_ExamplesLine(context, token)) {
      this.endRule(context, RuleType.Description)
      this.endRule(context, RuleType.Examples)
      this.endRule(context, RuleType.ExamplesDefinition)
      this.startRule(context, RuleType.ExamplesDefinition)
      this.startRule(context, RuleType.Examples)
      this.build(context, token)
      return 18
    }
    if (this.match_ScenarioLine(context, token)) {
      this.endRule(context, RuleType.Description)
      this.endRule(context, RuleType.Examples)
      this.endRule(context, RuleType.ExamplesDefinition)
      this.endRule(context, RuleType.Scenario)
      this.endRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.Scenario)
      this.build(context, token)
      return 12
    }
    if (this.match_RuleLine(context, token)) {
      this.endRule(context, RuleType.Description)
      this.endRule(context, RuleType.Examples)
      this.endRule(context, RuleType.ExamplesDefinition)
      this.endRule(context, RuleType.Scenario)
      this.endRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.Rule)
      this.startRule(context, RuleType.RuleHeader)
      this.build(context, token)
      return 22
    }
    if (this.match_Other(context, token)) {
      this.build(context, token)
      return 19
    }

    const stateComment =
      'State: 19 - GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:3>ExamplesDefinition:1>Examples:1>DescriptionHelper:1>Description:0>#Other:0'
    token.detach()
    const expectedTokens = [
      '#EOF',
      '#Comment',
      '#TableRow',
      '#TagLine',
      '#ExamplesLine',
      '#ScenarioLine',
      '#RuleLine',
      '#Other',
    ]
    const error = token.isEof
      ? UnexpectedEOFException.create(token, expectedTokens, stateComment)
      : UnexpectedTokenException.create(token, expectedTokens, stateComment)
    if (this.stopAtFirstError) {
      throw error
    }
    this.addError(context, error)
    return 19
  }

  // GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:3>ExamplesDefinition:1>Examples:1>DescriptionHelper:2>#Comment:0
  private matchTokenAt_20(token: Token, context: Context) {
    if (this.match_EOF(context, token)) {
      this.endRule(context, RuleType.Examples)
      this.endRule(context, RuleType.ExamplesDefinition)
      this.endRule(context, RuleType.Scenario)
      this.endRule(context, RuleType.ScenarioDefinition)
      this.endRule(context, RuleType.Feature)
      this.build(context, token)
      return 41
    }
    if (this.match_Comment(context, token)) {
      this.build(context, token)
      return 20
    }
    if (this.match_TableRow(context, token)) {
      this.startRule(context, RuleType.ExamplesTable)
      this.build(context, token)
      return 21
    }
    if (this.match_TagLine(context, token)) {
      if (this.lookahead_0(context, token)) {
        this.endRule(context, RuleType.Examples)
        this.endRule(context, RuleType.ExamplesDefinition)
        this.startRule(context, RuleType.ExamplesDefinition)
        this.startRule(context, RuleType.Tags)
        this.build(context, token)
        return 17
      }
    }
    if (this.match_TagLine(context, token)) {
      this.endRule(context, RuleType.Examples)
      this.endRule(context, RuleType.ExamplesDefinition)
      this.endRule(context, RuleType.Scenario)
      this.endRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.Tags)
      this.build(context, token)
      return 11
    }
    if (this.match_ExamplesLine(context, token)) {
      this.endRule(context, RuleType.Examples)
      this.endRule(context, RuleType.ExamplesDefinition)
      this.startRule(context, RuleType.ExamplesDefinition)
      this.startRule(context, RuleType.Examples)
      this.build(context, token)
      return 18
    }
    if (this.match_ScenarioLine(context, token)) {
      this.endRule(context, RuleType.Examples)
      this.endRule(context, RuleType.ExamplesDefinition)
      this.endRule(context, RuleType.Scenario)
      this.endRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.Scenario)
      this.build(context, token)
      return 12
    }
    if (this.match_RuleLine(context, token)) {
      this.endRule(context, RuleType.Examples)
      this.endRule(context, RuleType.ExamplesDefinition)
      this.endRule(context, RuleType.Scenario)
      this.endRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.Rule)
      this.startRule(context, RuleType.RuleHeader)
      this.build(context, token)
      return 22
    }
    if (this.match_Empty(context, token)) {
      this.build(context, token)
      return 20
    }

    const stateComment =
      'State: 20 - GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:3>ExamplesDefinition:1>Examples:1>DescriptionHelper:2>#Comment:0'
    token.detach()
    const expectedTokens = [
      '#EOF',
      '#Comment',
      '#TableRow',
      '#TagLine',
      '#ExamplesLine',
      '#ScenarioLine',
      '#RuleLine',
      '#Empty',
    ]
    const error = token.isEof
      ? UnexpectedEOFException.create(token, expectedTokens, stateComment)
      : UnexpectedTokenException.create(token, expectedTokens, stateComment)
    if (this.stopAtFirstError) {
      throw error
    }
    this.addError(context, error)
    return 20
  }

  // GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:3>ExamplesDefinition:1>Examples:2>ExamplesTable:0>#TableRow:0
  private matchTokenAt_21(token: Token, context: Context) {
    if (this.match_EOF(context, token)) {
      this.endRule(context, RuleType.ExamplesTable)
      this.endRule(context, RuleType.Examples)
      this.endRule(context, RuleType.ExamplesDefinition)
      this.endRule(context, RuleType.Scenario)
      this.endRule(context, RuleType.ScenarioDefinition)
      this.endRule(context, RuleType.Feature)
      this.build(context, token)
      return 41
    }
    if (this.match_TableRow(context, token)) {
      this.build(context, token)
      return 21
    }
    if (this.match_TagLine(context, token)) {
      if (this.lookahead_0(context, token)) {
        this.endRule(context, RuleType.ExamplesTable)
        this.endRule(context, RuleType.Examples)
        this.endRule(context, RuleType.ExamplesDefinition)
        this.startRule(context, RuleType.ExamplesDefinition)
        this.startRule(context, RuleType.Tags)
        this.build(context, token)
        return 17
      }
    }
    if (this.match_TagLine(context, token)) {
      this.endRule(context, RuleType.ExamplesTable)
      this.endRule(context, RuleType.Examples)
      this.endRule(context, RuleType.ExamplesDefinition)
      this.endRule(context, RuleType.Scenario)
      this.endRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.Tags)
      this.build(context, token)
      return 11
    }
    if (this.match_ExamplesLine(context, token)) {
      this.endRule(context, RuleType.ExamplesTable)
      this.endRule(context, RuleType.Examples)
      this.endRule(context, RuleType.ExamplesDefinition)
      this.startRule(context, RuleType.ExamplesDefinition)
      this.startRule(context, RuleType.Examples)
      this.build(context, token)
      return 18
    }
    if (this.match_ScenarioLine(context, token)) {
      this.endRule(context, RuleType.ExamplesTable)
      this.endRule(context, RuleType.Examples)
      this.endRule(context, RuleType.ExamplesDefinition)
      this.endRule(context, RuleType.Scenario)
      this.endRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.Scenario)
      this.build(context, token)
      return 12
    }
    if (this.match_RuleLine(context, token)) {
      this.endRule(context, RuleType.ExamplesTable)
      this.endRule(context, RuleType.Examples)
      this.endRule(context, RuleType.ExamplesDefinition)
      this.endRule(context, RuleType.Scenario)
      this.endRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.Rule)
      this.startRule(context, RuleType.RuleHeader)
      this.build(context, token)
      return 22
    }
    if (this.match_Comment(context, token)) {
      this.build(context, token)
      return 21
    }
    if (this.match_Empty(context, token)) {
      this.build(context, token)
      return 21
    }

    const stateComment =
      'State: 21 - GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:3>ExamplesDefinition:1>Examples:2>ExamplesTable:0>#TableRow:0'
    token.detach()
    const expectedTokens = [
      '#EOF',
      '#TableRow',
      '#TagLine',
      '#ExamplesLine',
      '#ScenarioLine',
      '#RuleLine',
      '#Comment',
      '#Empty',
    ]
    const error = token.isEof
      ? UnexpectedEOFException.create(token, expectedTokens, stateComment)
      : UnexpectedTokenException.create(token, expectedTokens, stateComment)
    if (this.stopAtFirstError) {
      throw error
    }
    this.addError(context, error)
    return 21
  }

  // GherkinDocument:0>Feature:3>Rule:0>RuleHeader:0>#RuleLine:0
  private matchTokenAt_22(token: Token, context: Context) {
    if (this.match_EOF(context, token)) {
      this.endRule(context, RuleType.RuleHeader)
      this.endRule(context, RuleType.Rule)
      this.endRule(context, RuleType.Feature)
      this.build(context, token)
      return 41
    }
    if (this.match_Empty(context, token)) {
      this.build(context, token)
      return 22
    }
    if (this.match_Comment(context, token)) {
      this.build(context, token)
      return 24
    }
    if (this.match_BackgroundLine(context, token)) {
      this.endRule(context, RuleType.RuleHeader)
      this.startRule(context, RuleType.Background)
      this.build(context, token)
      return 25
    }
    if (this.match_TagLine(context, token)) {
      this.endRule(context, RuleType.RuleHeader)
      this.startRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.Tags)
      this.build(context, token)
      return 30
    }
    if (this.match_ScenarioLine(context, token)) {
      this.endRule(context, RuleType.RuleHeader)
      this.startRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.Scenario)
      this.build(context, token)
      return 31
    }
    if (this.match_RuleLine(context, token)) {
      this.endRule(context, RuleType.RuleHeader)
      this.endRule(context, RuleType.Rule)
      this.startRule(context, RuleType.Rule)
      this.startRule(context, RuleType.RuleHeader)
      this.build(context, token)
      return 22
    }
    if (this.match_Other(context, token)) {
      this.startRule(context, RuleType.Description)
      this.build(context, token)
      return 23
    }

    const stateComment =
      'State: 22 - GherkinDocument:0>Feature:3>Rule:0>RuleHeader:0>#RuleLine:0'
    token.detach()
    const expectedTokens = [
      '#EOF',
      '#Empty',
      '#Comment',
      '#BackgroundLine',
      '#TagLine',
      '#ScenarioLine',
      '#RuleLine',
      '#Other',
    ]
    const error = token.isEof
      ? UnexpectedEOFException.create(token, expectedTokens, stateComment)
      : UnexpectedTokenException.create(token, expectedTokens, stateComment)
    if (this.stopAtFirstError) {
      throw error
    }
    this.addError(context, error)
    return 22
  }

  // GherkinDocument:0>Feature:3>Rule:0>RuleHeader:1>DescriptionHelper:1>Description:0>#Other:0
  private matchTokenAt_23(token: Token, context: Context) {
    if (this.match_EOF(context, token)) {
      this.endRule(context, RuleType.Description)
      this.endRule(context, RuleType.RuleHeader)
      this.endRule(context, RuleType.Rule)
      this.endRule(context, RuleType.Feature)
      this.build(context, token)
      return 41
    }
    if (this.match_Comment(context, token)) {
      this.endRule(context, RuleType.Description)
      this.build(context, token)
      return 24
    }
    if (this.match_BackgroundLine(context, token)) {
      this.endRule(context, RuleType.Description)
      this.endRule(context, RuleType.RuleHeader)
      this.startRule(context, RuleType.Background)
      this.build(context, token)
      return 25
    }
    if (this.match_TagLine(context, token)) {
      this.endRule(context, RuleType.Description)
      this.endRule(context, RuleType.RuleHeader)
      this.startRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.Tags)
      this.build(context, token)
      return 30
    }
    if (this.match_ScenarioLine(context, token)) {
      this.endRule(context, RuleType.Description)
      this.endRule(context, RuleType.RuleHeader)
      this.startRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.Scenario)
      this.build(context, token)
      return 31
    }
    if (this.match_RuleLine(context, token)) {
      this.endRule(context, RuleType.Description)
      this.endRule(context, RuleType.RuleHeader)
      this.endRule(context, RuleType.Rule)
      this.startRule(context, RuleType.Rule)
      this.startRule(context, RuleType.RuleHeader)
      this.build(context, token)
      return 22
    }
    if (this.match_Other(context, token)) {
      this.build(context, token)
      return 23
    }

    const stateComment =
      'State: 23 - GherkinDocument:0>Feature:3>Rule:0>RuleHeader:1>DescriptionHelper:1>Description:0>#Other:0'
    token.detach()
    const expectedTokens = [
      '#EOF',
      '#Comment',
      '#BackgroundLine',
      '#TagLine',
      '#ScenarioLine',
      '#RuleLine',
      '#Other',
    ]
    const error = token.isEof
      ? UnexpectedEOFException.create(token, expectedTokens, stateComment)
      : UnexpectedTokenException.create(token, expectedTokens, stateComment)
    if (this.stopAtFirstError) {
      throw error
    }
    this.addError(context, error)
    return 23
  }

  // GherkinDocument:0>Feature:3>Rule:0>RuleHeader:1>DescriptionHelper:2>#Comment:0
  private matchTokenAt_24(token: Token, context: Context) {
    if (this.match_EOF(context, token)) {
      this.endRule(context, RuleType.RuleHeader)
      this.endRule(context, RuleType.Rule)
      this.endRule(context, RuleType.Feature)
      this.build(context, token)
      return 41
    }
    if (this.match_Comment(context, token)) {
      this.build(context, token)
      return 24
    }
    if (this.match_BackgroundLine(context, token)) {
      this.endRule(context, RuleType.RuleHeader)
      this.startRule(context, RuleType.Background)
      this.build(context, token)
      return 25
    }
    if (this.match_TagLine(context, token)) {
      this.endRule(context, RuleType.RuleHeader)
      this.startRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.Tags)
      this.build(context, token)
      return 30
    }
    if (this.match_ScenarioLine(context, token)) {
      this.endRule(context, RuleType.RuleHeader)
      this.startRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.Scenario)
      this.build(context, token)
      return 31
    }
    if (this.match_RuleLine(context, token)) {
      this.endRule(context, RuleType.RuleHeader)
      this.endRule(context, RuleType.Rule)
      this.startRule(context, RuleType.Rule)
      this.startRule(context, RuleType.RuleHeader)
      this.build(context, token)
      return 22
    }
    if (this.match_Empty(context, token)) {
      this.build(context, token)
      return 24
    }

    const stateComment =
      'State: 24 - GherkinDocument:0>Feature:3>Rule:0>RuleHeader:1>DescriptionHelper:2>#Comment:0'
    token.detach()
    const expectedTokens = [
      '#EOF',
      '#Comment',
      '#BackgroundLine',
      '#TagLine',
      '#ScenarioLine',
      '#RuleLine',
      '#Empty',
    ]
    const error = token.isEof
      ? UnexpectedEOFException.create(token, expectedTokens, stateComment)
      : UnexpectedTokenException.create(token, expectedTokens, stateComment)
    if (this.stopAtFirstError) {
      throw error
    }
    this.addError(context, error)
    return 24
  }

  // GherkinDocument:0>Feature:3>Rule:1>Background:0>#BackgroundLine:0
  private matchTokenAt_25(token: Token, context: Context) {
    if (this.match_EOF(context, token)) {
      this.endRule(context, RuleType.Background)
      this.endRule(context, RuleType.Rule)
      this.endRule(context, RuleType.Feature)
      this.build(context, token)
      return 41
    }
    if (this.match_Empty(context, token)) {
      this.build(context, token)
      return 25
    }
    if (this.match_Comment(context, token)) {
      this.build(context, token)
      return 27
    }
    if (this.match_StepLine(context, token)) {
      this.startRule(context, RuleType.Step)
      this.build(context, token)
      return 28
    }
    if (this.match_TagLine(context, token)) {
      this.endRule(context, RuleType.Background)
      this.startRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.Tags)
      this.build(context, token)
      return 30
    }
    if (this.match_ScenarioLine(context, token)) {
      this.endRule(context, RuleType.Background)
      this.startRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.Scenario)
      this.build(context, token)
      return 31
    }
    if (this.match_RuleLine(context, token)) {
      this.endRule(context, RuleType.Background)
      this.endRule(context, RuleType.Rule)
      this.startRule(context, RuleType.Rule)
      this.startRule(context, RuleType.RuleHeader)
      this.build(context, token)
      return 22
    }
    if (this.match_Other(context, token)) {
      this.startRule(context, RuleType.Description)
      this.build(context, token)
      return 26
    }

    const stateComment =
      'State: 25 - GherkinDocument:0>Feature:3>Rule:1>Background:0>#BackgroundLine:0'
    token.detach()
    const expectedTokens = [
      '#EOF',
      '#Empty',
      '#Comment',
      '#StepLine',
      '#TagLine',
      '#ScenarioLine',
      '#RuleLine',
      '#Other',
    ]
    const error = token.isEof
      ? UnexpectedEOFException.create(token, expectedTokens, stateComment)
      : UnexpectedTokenException.create(token, expectedTokens, stateComment)
    if (this.stopAtFirstError) {
      throw error
    }
    this.addError(context, error)
    return 25
  }

  // GherkinDocument:0>Feature:3>Rule:1>Background:1>DescriptionHelper:1>Description:0>#Other:0
  private matchTokenAt_26(token: Token, context: Context) {
    if (this.match_EOF(context, token)) {
      this.endRule(context, RuleType.Description)
      this.endRule(context, RuleType.Background)
      this.endRule(context, RuleType.Rule)
      this.endRule(context, RuleType.Feature)
      this.build(context, token)
      return 41
    }
    if (this.match_Comment(context, token)) {
      this.endRule(context, RuleType.Description)
      this.build(context, token)
      return 27
    }
    if (this.match_StepLine(context, token)) {
      this.endRule(context, RuleType.Description)
      this.startRule(context, RuleType.Step)
      this.build(context, token)
      return 28
    }
    if (this.match_TagLine(context, token)) {
      this.endRule(context, RuleType.Description)
      this.endRule(context, RuleType.Background)
      this.startRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.Tags)
      this.build(context, token)
      return 30
    }
    if (this.match_ScenarioLine(context, token)) {
      this.endRule(context, RuleType.Description)
      this.endRule(context, RuleType.Background)
      this.startRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.Scenario)
      this.build(context, token)
      return 31
    }
    if (this.match_RuleLine(context, token)) {
      this.endRule(context, RuleType.Description)
      this.endRule(context, RuleType.Background)
      this.endRule(context, RuleType.Rule)
      this.startRule(context, RuleType.Rule)
      this.startRule(context, RuleType.RuleHeader)
      this.build(context, token)
      return 22
    }
    if (this.match_Other(context, token)) {
      this.build(context, token)
      return 26
    }

    const stateComment =
      'State: 26 - GherkinDocument:0>Feature:3>Rule:1>Background:1>DescriptionHelper:1>Description:0>#Other:0'
    token.detach()
    const expectedTokens = [
      '#EOF',
      '#Comment',
      '#StepLine',
      '#TagLine',
      '#ScenarioLine',
      '#RuleLine',
      '#Other',
    ]
    const error = token.isEof
      ? UnexpectedEOFException.create(token, expectedTokens, stateComment)
      : UnexpectedTokenException.create(token, expectedTokens, stateComment)
    if (this.stopAtFirstError) {
      throw error
    }
    this.addError(context, error)
    return 26
  }

  // GherkinDocument:0>Feature:3>Rule:1>Background:1>DescriptionHelper:2>#Comment:0
  private matchTokenAt_27(token: Token, context: Context) {
    if (this.match_EOF(context, token)) {
      this.endRule(context, RuleType.Background)
      this.endRule(context, RuleType.Rule)
      this.endRule(context, RuleType.Feature)
      this.build(context, token)
      return 41
    }
    if (this.match_Comment(context, token)) {
      this.build(context, token)
      return 27
    }
    if (this.match_StepLine(context, token)) {
      this.startRule(context, RuleType.Step)
      this.build(context, token)
      return 28
    }
    if (this.match_TagLine(context, token)) {
      this.endRule(context, RuleType.Background)
      this.startRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.Tags)
      this.build(context, token)
      return 30
    }
    if (this.match_ScenarioLine(context, token)) {
      this.endRule(context, RuleType.Background)
      this.startRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.Scenario)
      this.build(context, token)
      return 31
    }
    if (this.match_RuleLine(context, token)) {
      this.endRule(context, RuleType.Background)
      this.endRule(context, RuleType.Rule)
      this.startRule(context, RuleType.Rule)
      this.startRule(context, RuleType.RuleHeader)
      this.build(context, token)
      return 22
    }
    if (this.match_Empty(context, token)) {
      this.build(context, token)
      return 27
    }

    const stateComment =
      'State: 27 - GherkinDocument:0>Feature:3>Rule:1>Background:1>DescriptionHelper:2>#Comment:0'
    token.detach()
    const expectedTokens = [
      '#EOF',
      '#Comment',
      '#StepLine',
      '#TagLine',
      '#ScenarioLine',
      '#RuleLine',
      '#Empty',
    ]
    const error = token.isEof
      ? UnexpectedEOFException.create(token, expectedTokens, stateComment)
      : UnexpectedTokenException.create(token, expectedTokens, stateComment)
    if (this.stopAtFirstError) {
      throw error
    }
    this.addError(context, error)
    return 27
  }

  // GherkinDocument:0>Feature:3>Rule:1>Background:2>Step:0>#StepLine:0
  private matchTokenAt_28(token: Token, context: Context) {
    if (this.match_EOF(context, token)) {
      this.endRule(context, RuleType.Step)
      this.endRule(context, RuleType.Background)
      this.endRule(context, RuleType.Rule)
      this.endRule(context, RuleType.Feature)
      this.build(context, token)
      return 41
    }
    if (this.match_TableRow(context, token)) {
      this.startRule(context, RuleType.DataTable)
      this.build(context, token)
      return 29
    }
    if (this.match_DocStringSeparator(context, token)) {
      this.startRule(context, RuleType.DocString)
      this.build(context, token)
      return 44
    }
    if (this.match_StepLine(context, token)) {
      this.endRule(context, RuleType.Step)
      this.startRule(context, RuleType.Step)
      this.build(context, token)
      return 28
    }
    if (this.match_TagLine(context, token)) {
      this.endRule(context, RuleType.Step)
      this.endRule(context, RuleType.Background)
      this.startRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.Tags)
      this.build(context, token)
      return 30
    }
    if (this.match_ScenarioLine(context, token)) {
      this.endRule(context, RuleType.Step)
      this.endRule(context, RuleType.Background)
      this.startRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.Scenario)
      this.build(context, token)
      return 31
    }
    if (this.match_RuleLine(context, token)) {
      this.endRule(context, RuleType.Step)
      this.endRule(context, RuleType.Background)
      this.endRule(context, RuleType.Rule)
      this.startRule(context, RuleType.Rule)
      this.startRule(context, RuleType.RuleHeader)
      this.build(context, token)
      return 22
    }
    if (this.match_Comment(context, token)) {
      this.build(context, token)
      return 28
    }
    if (this.match_Empty(context, token)) {
      this.build(context, token)
      return 28
    }

    const stateComment =
      'State: 28 - GherkinDocument:0>Feature:3>Rule:1>Background:2>Step:0>#StepLine:0'
    token.detach()
    const expectedTokens = [
      '#EOF',
      '#TableRow',
      '#DocStringSeparator',
      '#StepLine',
      '#TagLine',
      '#ScenarioLine',
      '#RuleLine',
      '#Comment',
      '#Empty',
    ]
    const error = token.isEof
      ? UnexpectedEOFException.create(token, expectedTokens, stateComment)
      : UnexpectedTokenException.create(token, expectedTokens, stateComment)
    if (this.stopAtFirstError) {
      throw error
    }
    this.addError(context, error)
    return 28
  }

  // GherkinDocument:0>Feature:3>Rule:1>Background:2>Step:1>StepArg:0>__alt0:0>DataTable:0>#TableRow:0
  private matchTokenAt_29(token: Token, context: Context) {
    if (this.match_EOF(context, token)) {
      this.endRule(context, RuleType.DataTable)
      this.endRule(context, RuleType.Step)
      this.endRule(context, RuleType.Background)
      this.endRule(context, RuleType.Rule)
      this.endRule(context, RuleType.Feature)
      this.build(context, token)
      return 41
    }
    if (this.match_TableRow(context, token)) {
      this.build(context, token)
      return 29
    }
    if (this.match_StepLine(context, token)) {
      this.endRule(context, RuleType.DataTable)
      this.endRule(context, RuleType.Step)
      this.startRule(context, RuleType.Step)
      this.build(context, token)
      return 28
    }
    if (this.match_TagLine(context, token)) {
      this.endRule(context, RuleType.DataTable)
      this.endRule(context, RuleType.Step)
      this.endRule(context, RuleType.Background)
      this.startRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.Tags)
      this.build(context, token)
      return 30
    }
    if (this.match_ScenarioLine(context, token)) {
      this.endRule(context, RuleType.DataTable)
      this.endRule(context, RuleType.Step)
      this.endRule(context, RuleType.Background)
      this.startRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.Scenario)
      this.build(context, token)
      return 31
    }
    if (this.match_RuleLine(context, token)) {
      this.endRule(context, RuleType.DataTable)
      this.endRule(context, RuleType.Step)
      this.endRule(context, RuleType.Background)
      this.endRule(context, RuleType.Rule)
      this.startRule(context, RuleType.Rule)
      this.startRule(context, RuleType.RuleHeader)
      this.build(context, token)
      return 22
    }
    if (this.match_Comment(context, token)) {
      this.build(context, token)
      return 29
    }
    if (this.match_Empty(context, token)) {
      this.build(context, token)
      return 29
    }

    const stateComment =
      'State: 29 - GherkinDocument:0>Feature:3>Rule:1>Background:2>Step:1>StepArg:0>__alt0:0>DataTable:0>#TableRow:0'
    token.detach()
    const expectedTokens = [
      '#EOF',
      '#TableRow',
      '#StepLine',
      '#TagLine',
      '#ScenarioLine',
      '#RuleLine',
      '#Comment',
      '#Empty',
    ]
    const error = token.isEof
      ? UnexpectedEOFException.create(token, expectedTokens, stateComment)
      : UnexpectedTokenException.create(token, expectedTokens, stateComment)
    if (this.stopAtFirstError) {
      throw error
    }
    this.addError(context, error)
    return 29
  }

  // GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:0>Tags:0>#TagLine:0
  private matchTokenAt_30(token: Token, context: Context) {
    if (this.match_TagLine(context, token)) {
      this.build(context, token)
      return 30
    }
    if (this.match_ScenarioLine(context, token)) {
      this.endRule(context, RuleType.Tags)
      this.startRule(context, RuleType.Scenario)
      this.build(context, token)
      return 31
    }
    if (this.match_Comment(context, token)) {
      this.build(context, token)
      return 30
    }
    if (this.match_Empty(context, token)) {
      this.build(context, token)
      return 30
    }

    const stateComment =
      'State: 30 - GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:0>Tags:0>#TagLine:0'
    token.detach()
    const expectedTokens = ['#TagLine', '#ScenarioLine', '#Comment', '#Empty']
    const error = token.isEof
      ? UnexpectedEOFException.create(token, expectedTokens, stateComment)
      : UnexpectedTokenException.create(token, expectedTokens, stateComment)
    if (this.stopAtFirstError) {
      throw error
    }
    this.addError(context, error)
    return 30
  }

  // GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:0>#ScenarioLine:0
  private matchTokenAt_31(token: Token, context: Context) {
    if (this.match_EOF(context, token)) {
      this.endRule(context, RuleType.Scenario)
      this.endRule(context, RuleType.ScenarioDefinition)
      this.endRule(context, RuleType.Rule)
      this.endRule(context, RuleType.Feature)
      this.build(context, token)
      return 41
    }
    if (this.match_Empty(context, token)) {
      this.build(context, token)
      return 31
    }
    if (this.match_Comment(context, token)) {
      this.build(context, token)
      return 33
    }
    if (this.match_StepLine(context, token)) {
      this.startRule(context, RuleType.Step)
      this.build(context, token)
      return 34
    }
    if (this.match_TagLine(context, token)) {
      if (this.lookahead_0(context, token)) {
        this.startRule(context, RuleType.ExamplesDefinition)
        this.startRule(context, RuleType.Tags)
        this.build(context, token)
        return 36
      }
    }
    if (this.match_TagLine(context, token)) {
      this.endRule(context, RuleType.Scenario)
      this.endRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.Tags)
      this.build(context, token)
      return 30
    }
    if (this.match_ExamplesLine(context, token)) {
      this.startRule(context, RuleType.ExamplesDefinition)
      this.startRule(context, RuleType.Examples)
      this.build(context, token)
      return 37
    }
    if (this.match_ScenarioLine(context, token)) {
      this.endRule(context, RuleType.Scenario)
      this.endRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.Scenario)
      this.build(context, token)
      return 31
    }
    if (this.match_RuleLine(context, token)) {
      this.endRule(context, RuleType.Scenario)
      this.endRule(context, RuleType.ScenarioDefinition)
      this.endRule(context, RuleType.Rule)
      this.startRule(context, RuleType.Rule)
      this.startRule(context, RuleType.RuleHeader)
      this.build(context, token)
      return 22
    }
    if (this.match_Other(context, token)) {
      this.startRule(context, RuleType.Description)
      this.build(context, token)
      return 32
    }

    const stateComment =
      'State: 31 - GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:0>#ScenarioLine:0'
    token.detach()
    const expectedTokens = [
      '#EOF',
      '#Empty',
      '#Comment',
      '#StepLine',
      '#TagLine',
      '#ExamplesLine',
      '#ScenarioLine',
      '#RuleLine',
      '#Other',
    ]
    const error = token.isEof
      ? UnexpectedEOFException.create(token, expectedTokens, stateComment)
      : UnexpectedTokenException.create(token, expectedTokens, stateComment)
    if (this.stopAtFirstError) {
      throw error
    }
    this.addError(context, error)
    return 31
  }

  // GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:1>DescriptionHelper:1>Description:0>#Other:0
  private matchTokenAt_32(token: Token, context: Context) {
    if (this.match_EOF(context, token)) {
      this.endRule(context, RuleType.Description)
      this.endRule(context, RuleType.Scenario)
      this.endRule(context, RuleType.ScenarioDefinition)
      this.endRule(context, RuleType.Rule)
      this.endRule(context, RuleType.Feature)
      this.build(context, token)
      return 41
    }
    if (this.match_Comment(context, token)) {
      this.endRule(context, RuleType.Description)
      this.build(context, token)
      return 33
    }
    if (this.match_StepLine(context, token)) {
      this.endRule(context, RuleType.Description)
      this.startRule(context, RuleType.Step)
      this.build(context, token)
      return 34
    }
    if (this.match_TagLine(context, token)) {
      if (this.lookahead_0(context, token)) {
        this.endRule(context, RuleType.Description)
        this.startRule(context, RuleType.ExamplesDefinition)
        this.startRule(context, RuleType.Tags)
        this.build(context, token)
        return 36
      }
    }
    if (this.match_TagLine(context, token)) {
      this.endRule(context, RuleType.Description)
      this.endRule(context, RuleType.Scenario)
      this.endRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.Tags)
      this.build(context, token)
      return 30
    }
    if (this.match_ExamplesLine(context, token)) {
      this.endRule(context, RuleType.Description)
      this.startRule(context, RuleType.ExamplesDefinition)
      this.startRule(context, RuleType.Examples)
      this.build(context, token)
      return 37
    }
    if (this.match_ScenarioLine(context, token)) {
      this.endRule(context, RuleType.Description)
      this.endRule(context, RuleType.Scenario)
      this.endRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.Scenario)
      this.build(context, token)
      return 31
    }
    if (this.match_RuleLine(context, token)) {
      this.endRule(context, RuleType.Description)
      this.endRule(context, RuleType.Scenario)
      this.endRule(context, RuleType.ScenarioDefinition)
      this.endRule(context, RuleType.Rule)
      this.startRule(context, RuleType.Rule)
      this.startRule(context, RuleType.RuleHeader)
      this.build(context, token)
      return 22
    }
    if (this.match_Other(context, token)) {
      this.build(context, token)
      return 32
    }

    const stateComment =
      'State: 32 - GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:1>DescriptionHelper:1>Description:0>#Other:0'
    token.detach()
    const expectedTokens = [
      '#EOF',
      '#Comment',
      '#StepLine',
      '#TagLine',
      '#ExamplesLine',
      '#ScenarioLine',
      '#RuleLine',
      '#Other',
    ]
    const error = token.isEof
      ? UnexpectedEOFException.create(token, expectedTokens, stateComment)
      : UnexpectedTokenException.create(token, expectedTokens, stateComment)
    if (this.stopAtFirstError) {
      throw error
    }
    this.addError(context, error)
    return 32
  }

  // GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:1>DescriptionHelper:2>#Comment:0
  private matchTokenAt_33(token: Token, context: Context) {
    if (this.match_EOF(context, token)) {
      this.endRule(context, RuleType.Scenario)
      this.endRule(context, RuleType.ScenarioDefinition)
      this.endRule(context, RuleType.Rule)
      this.endRule(context, RuleType.Feature)
      this.build(context, token)
      return 41
    }
    if (this.match_Comment(context, token)) {
      this.build(context, token)
      return 33
    }
    if (this.match_StepLine(context, token)) {
      this.startRule(context, RuleType.Step)
      this.build(context, token)
      return 34
    }
    if (this.match_TagLine(context, token)) {
      if (this.lookahead_0(context, token)) {
        this.startRule(context, RuleType.ExamplesDefinition)
        this.startRule(context, RuleType.Tags)
        this.build(context, token)
        return 36
      }
    }
    if (this.match_TagLine(context, token)) {
      this.endRule(context, RuleType.Scenario)
      this.endRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.Tags)
      this.build(context, token)
      return 30
    }
    if (this.match_ExamplesLine(context, token)) {
      this.startRule(context, RuleType.ExamplesDefinition)
      this.startRule(context, RuleType.Examples)
      this.build(context, token)
      return 37
    }
    if (this.match_ScenarioLine(context, token)) {
      this.endRule(context, RuleType.Scenario)
      this.endRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.Scenario)
      this.build(context, token)
      return 31
    }
    if (this.match_RuleLine(context, token)) {
      this.endRule(context, RuleType.Scenario)
      this.endRule(context, RuleType.ScenarioDefinition)
      this.endRule(context, RuleType.Rule)
      this.startRule(context, RuleType.Rule)
      this.startRule(context, RuleType.RuleHeader)
      this.build(context, token)
      return 22
    }
    if (this.match_Empty(context, token)) {
      this.build(context, token)
      return 33
    }

    const stateComment =
      'State: 33 - GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:1>DescriptionHelper:2>#Comment:0'
    token.detach()
    const expectedTokens = [
      '#EOF',
      '#Comment',
      '#StepLine',
      '#TagLine',
      '#ExamplesLine',
      '#ScenarioLine',
      '#RuleLine',
      '#Empty',
    ]
    const error = token.isEof
      ? UnexpectedEOFException.create(token, expectedTokens, stateComment)
      : UnexpectedTokenException.create(token, expectedTokens, stateComment)
    if (this.stopAtFirstError) {
      throw error
    }
    this.addError(context, error)
    return 33
  }

  // GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:2>Step:0>#StepLine:0
  private matchTokenAt_34(token: Token, context: Context) {
    if (this.match_EOF(context, token)) {
      this.endRule(context, RuleType.Step)
      this.endRule(context, RuleType.Scenario)
      this.endRule(context, RuleType.ScenarioDefinition)
      this.endRule(context, RuleType.Rule)
      this.endRule(context, RuleType.Feature)
      this.build(context, token)
      return 41
    }
    if (this.match_TableRow(context, token)) {
      this.startRule(context, RuleType.DataTable)
      this.build(context, token)
      return 35
    }
    if (this.match_DocStringSeparator(context, token)) {
      this.startRule(context, RuleType.DocString)
      this.build(context, token)
      return 42
    }
    if (this.match_StepLine(context, token)) {
      this.endRule(context, RuleType.Step)
      this.startRule(context, RuleType.Step)
      this.build(context, token)
      return 34
    }
    if (this.match_TagLine(context, token)) {
      if (this.lookahead_0(context, token)) {
        this.endRule(context, RuleType.Step)
        this.startRule(context, RuleType.ExamplesDefinition)
        this.startRule(context, RuleType.Tags)
        this.build(context, token)
        return 36
      }
    }
    if (this.match_TagLine(context, token)) {
      this.endRule(context, RuleType.Step)
      this.endRule(context, RuleType.Scenario)
      this.endRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.Tags)
      this.build(context, token)
      return 30
    }
    if (this.match_ExamplesLine(context, token)) {
      this.endRule(context, RuleType.Step)
      this.startRule(context, RuleType.ExamplesDefinition)
      this.startRule(context, RuleType.Examples)
      this.build(context, token)
      return 37
    }
    if (this.match_ScenarioLine(context, token)) {
      this.endRule(context, RuleType.Step)
      this.endRule(context, RuleType.Scenario)
      this.endRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.Scenario)
      this.build(context, token)
      return 31
    }
    if (this.match_RuleLine(context, token)) {
      this.endRule(context, RuleType.Step)
      this.endRule(context, RuleType.Scenario)
      this.endRule(context, RuleType.ScenarioDefinition)
      this.endRule(context, RuleType.Rule)
      this.startRule(context, RuleType.Rule)
      this.startRule(context, RuleType.RuleHeader)
      this.build(context, token)
      return 22
    }
    if (this.match_Comment(context, token)) {
      this.build(context, token)
      return 34
    }
    if (this.match_Empty(context, token)) {
      this.build(context, token)
      return 34
    }

    const stateComment =
      'State: 34 - GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:2>Step:0>#StepLine:0'
    token.detach()
    const expectedTokens = [
      '#EOF',
      '#TableRow',
      '#DocStringSeparator',
      '#StepLine',
      '#TagLine',
      '#ExamplesLine',
      '#ScenarioLine',
      '#RuleLine',
      '#Comment',
      '#Empty',
    ]
    const error = token.isEof
      ? UnexpectedEOFException.create(token, expectedTokens, stateComment)
      : UnexpectedTokenException.create(token, expectedTokens, stateComment)
    if (this.stopAtFirstError) {
      throw error
    }
    this.addError(context, error)
    return 34
  }

  // GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:2>Step:1>StepArg:0>__alt0:0>DataTable:0>#TableRow:0
  private matchTokenAt_35(token: Token, context: Context) {
    if (this.match_EOF(context, token)) {
      this.endRule(context, RuleType.DataTable)
      this.endRule(context, RuleType.Step)
      this.endRule(context, RuleType.Scenario)
      this.endRule(context, RuleType.ScenarioDefinition)
      this.endRule(context, RuleType.Rule)
      this.endRule(context, RuleType.Feature)
      this.build(context, token)
      return 41
    }
    if (this.match_TableRow(context, token)) {
      this.build(context, token)
      return 35
    }
    if (this.match_StepLine(context, token)) {
      this.endRule(context, RuleType.DataTable)
      this.endRule(context, RuleType.Step)
      this.startRule(context, RuleType.Step)
      this.build(context, token)
      return 34
    }
    if (this.match_TagLine(context, token)) {
      if (this.lookahead_0(context, token)) {
        this.endRule(context, RuleType.DataTable)
        this.endRule(context, RuleType.Step)
        this.startRule(context, RuleType.ExamplesDefinition)
        this.startRule(context, RuleType.Tags)
        this.build(context, token)
        return 36
      }
    }
    if (this.match_TagLine(context, token)) {
      this.endRule(context, RuleType.DataTable)
      this.endRule(context, RuleType.Step)
      this.endRule(context, RuleType.Scenario)
      this.endRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.Tags)
      this.build(context, token)
      return 30
    }
    if (this.match_ExamplesLine(context, token)) {
      this.endRule(context, RuleType.DataTable)
      this.endRule(context, RuleType.Step)
      this.startRule(context, RuleType.ExamplesDefinition)
      this.startRule(context, RuleType.Examples)
      this.build(context, token)
      return 37
    }
    if (this.match_ScenarioLine(context, token)) {
      this.endRule(context, RuleType.DataTable)
      this.endRule(context, RuleType.Step)
      this.endRule(context, RuleType.Scenario)
      this.endRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.Scenario)
      this.build(context, token)
      return 31
    }
    if (this.match_RuleLine(context, token)) {
      this.endRule(context, RuleType.DataTable)
      this.endRule(context, RuleType.Step)
      this.endRule(context, RuleType.Scenario)
      this.endRule(context, RuleType.ScenarioDefinition)
      this.endRule(context, RuleType.Rule)
      this.startRule(context, RuleType.Rule)
      this.startRule(context, RuleType.RuleHeader)
      this.build(context, token)
      return 22
    }
    if (this.match_Comment(context, token)) {
      this.build(context, token)
      return 35
    }
    if (this.match_Empty(context, token)) {
      this.build(context, token)
      return 35
    }

    const stateComment =
      'State: 35 - GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:2>Step:1>StepArg:0>__alt0:0>DataTable:0>#TableRow:0'
    token.detach()
    const expectedTokens = [
      '#EOF',
      '#TableRow',
      '#StepLine',
      '#TagLine',
      '#ExamplesLine',
      '#ScenarioLine',
      '#RuleLine',
      '#Comment',
      '#Empty',
    ]
    const error = token.isEof
      ? UnexpectedEOFException.create(token, expectedTokens, stateComment)
      : UnexpectedTokenException.create(token, expectedTokens, stateComment)
    if (this.stopAtFirstError) {
      throw error
    }
    this.addError(context, error)
    return 35
  }

  // GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:3>ExamplesDefinition:0>Tags:0>#TagLine:0
  private matchTokenAt_36(token: Token, context: Context) {
    if (this.match_TagLine(context, token)) {
      this.build(context, token)
      return 36
    }
    if (this.match_ExamplesLine(context, token)) {
      this.endRule(context, RuleType.Tags)
      this.startRule(context, RuleType.Examples)
      this.build(context, token)
      return 37
    }
    if (this.match_Comment(context, token)) {
      this.build(context, token)
      return 36
    }
    if (this.match_Empty(context, token)) {
      this.build(context, token)
      return 36
    }

    const stateComment =
      'State: 36 - GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:3>ExamplesDefinition:0>Tags:0>#TagLine:0'
    token.detach()
    const expectedTokens = ['#TagLine', '#ExamplesLine', '#Comment', '#Empty']
    const error = token.isEof
      ? UnexpectedEOFException.create(token, expectedTokens, stateComment)
      : UnexpectedTokenException.create(token, expectedTokens, stateComment)
    if (this.stopAtFirstError) {
      throw error
    }
    this.addError(context, error)
    return 36
  }

  // GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:3>ExamplesDefinition:1>Examples:0>#ExamplesLine:0
  private matchTokenAt_37(token: Token, context: Context) {
    if (this.match_EOF(context, token)) {
      this.endRule(context, RuleType.Examples)
      this.endRule(context, RuleType.ExamplesDefinition)
      this.endRule(context, RuleType.Scenario)
      this.endRule(context, RuleType.ScenarioDefinition)
      this.endRule(context, RuleType.Rule)
      this.endRule(context, RuleType.Feature)
      this.build(context, token)
      return 41
    }
    if (this.match_Empty(context, token)) {
      this.build(context, token)
      return 37
    }
    if (this.match_Comment(context, token)) {
      this.build(context, token)
      return 39
    }
    if (this.match_TableRow(context, token)) {
      this.startRule(context, RuleType.ExamplesTable)
      this.build(context, token)
      return 40
    }
    if (this.match_TagLine(context, token)) {
      if (this.lookahead_0(context, token)) {
        this.endRule(context, RuleType.Examples)
        this.endRule(context, RuleType.ExamplesDefinition)
        this.startRule(context, RuleType.ExamplesDefinition)
        this.startRule(context, RuleType.Tags)
        this.build(context, token)
        return 36
      }
    }
    if (this.match_TagLine(context, token)) {
      this.endRule(context, RuleType.Examples)
      this.endRule(context, RuleType.ExamplesDefinition)
      this.endRule(context, RuleType.Scenario)
      this.endRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.Tags)
      this.build(context, token)
      return 30
    }
    if (this.match_ExamplesLine(context, token)) {
      this.endRule(context, RuleType.Examples)
      this.endRule(context, RuleType.ExamplesDefinition)
      this.startRule(context, RuleType.ExamplesDefinition)
      this.startRule(context, RuleType.Examples)
      this.build(context, token)
      return 37
    }
    if (this.match_ScenarioLine(context, token)) {
      this.endRule(context, RuleType.Examples)
      this.endRule(context, RuleType.ExamplesDefinition)
      this.endRule(context, RuleType.Scenario)
      this.endRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.Scenario)
      this.build(context, token)
      return 31
    }
    if (this.match_RuleLine(context, token)) {
      this.endRule(context, RuleType.Examples)
      this.endRule(context, RuleType.ExamplesDefinition)
      this.endRule(context, RuleType.Scenario)
      this.endRule(context, RuleType.ScenarioDefinition)
      this.endRule(context, RuleType.Rule)
      this.startRule(context, RuleType.Rule)
      this.startRule(context, RuleType.RuleHeader)
      this.build(context, token)
      return 22
    }
    if (this.match_Other(context, token)) {
      this.startRule(context, RuleType.Description)
      this.build(context, token)
      return 38
    }

    const stateComment =
      'State: 37 - GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:3>ExamplesDefinition:1>Examples:0>#ExamplesLine:0'
    token.detach()
    const expectedTokens = [
      '#EOF',
      '#Empty',
      '#Comment',
      '#TableRow',
      '#TagLine',
      '#ExamplesLine',
      '#ScenarioLine',
      '#RuleLine',
      '#Other',
    ]
    const error = token.isEof
      ? UnexpectedEOFException.create(token, expectedTokens, stateComment)
      : UnexpectedTokenException.create(token, expectedTokens, stateComment)
    if (this.stopAtFirstError) {
      throw error
    }
    this.addError(context, error)
    return 37
  }

  // GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:3>ExamplesDefinition:1>Examples:1>DescriptionHelper:1>Description:0>#Other:0
  private matchTokenAt_38(token: Token, context: Context) {
    if (this.match_EOF(context, token)) {
      this.endRule(context, RuleType.Description)
      this.endRule(context, RuleType.Examples)
      this.endRule(context, RuleType.ExamplesDefinition)
      this.endRule(context, RuleType.Scenario)
      this.endRule(context, RuleType.ScenarioDefinition)
      this.endRule(context, RuleType.Rule)
      this.endRule(context, RuleType.Feature)
      this.build(context, token)
      return 41
    }
    if (this.match_Comment(context, token)) {
      this.endRule(context, RuleType.Description)
      this.build(context, token)
      return 39
    }
    if (this.match_TableRow(context, token)) {
      this.endRule(context, RuleType.Description)
      this.startRule(context, RuleType.ExamplesTable)
      this.build(context, token)
      return 40
    }
    if (this.match_TagLine(context, token)) {
      if (this.lookahead_0(context, token)) {
        this.endRule(context, RuleType.Description)
        this.endRule(context, RuleType.Examples)
        this.endRule(context, RuleType.ExamplesDefinition)
        this.startRule(context, RuleType.ExamplesDefinition)
        this.startRule(context, RuleType.Tags)
        this.build(context, token)
        return 36
      }
    }
    if (this.match_TagLine(context, token)) {
      this.endRule(context, RuleType.Description)
      this.endRule(context, RuleType.Examples)
      this.endRule(context, RuleType.ExamplesDefinition)
      this.endRule(context, RuleType.Scenario)
      this.endRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.Tags)
      this.build(context, token)
      return 30
    }
    if (this.match_ExamplesLine(context, token)) {
      this.endRule(context, RuleType.Description)
      this.endRule(context, RuleType.Examples)
      this.endRule(context, RuleType.ExamplesDefinition)
      this.startRule(context, RuleType.ExamplesDefinition)
      this.startRule(context, RuleType.Examples)
      this.build(context, token)
      return 37
    }
    if (this.match_ScenarioLine(context, token)) {
      this.endRule(context, RuleType.Description)
      this.endRule(context, RuleType.Examples)
      this.endRule(context, RuleType.ExamplesDefinition)
      this.endRule(context, RuleType.Scenario)
      this.endRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.Scenario)
      this.build(context, token)
      return 31
    }
    if (this.match_RuleLine(context, token)) {
      this.endRule(context, RuleType.Description)
      this.endRule(context, RuleType.Examples)
      this.endRule(context, RuleType.ExamplesDefinition)
      this.endRule(context, RuleType.Scenario)
      this.endRule(context, RuleType.ScenarioDefinition)
      this.endRule(context, RuleType.Rule)
      this.startRule(context, RuleType.Rule)
      this.startRule(context, RuleType.RuleHeader)
      this.build(context, token)
      return 22
    }
    if (this.match_Other(context, token)) {
      this.build(context, token)
      return 38
    }

    const stateComment =
      'State: 38 - GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:3>ExamplesDefinition:1>Examples:1>DescriptionHelper:1>Description:0>#Other:0'
    token.detach()
    const expectedTokens = [
      '#EOF',
      '#Comment',
      '#TableRow',
      '#TagLine',
      '#ExamplesLine',
      '#ScenarioLine',
      '#RuleLine',
      '#Other',
    ]
    const error = token.isEof
      ? UnexpectedEOFException.create(token, expectedTokens, stateComment)
      : UnexpectedTokenException.create(token, expectedTokens, stateComment)
    if (this.stopAtFirstError) {
      throw error
    }
    this.addError(context, error)
    return 38
  }

  // GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:3>ExamplesDefinition:1>Examples:1>DescriptionHelper:2>#Comment:0
  private matchTokenAt_39(token: Token, context: Context) {
    if (this.match_EOF(context, token)) {
      this.endRule(context, RuleType.Examples)
      this.endRule(context, RuleType.ExamplesDefinition)
      this.endRule(context, RuleType.Scenario)
      this.endRule(context, RuleType.ScenarioDefinition)
      this.endRule(context, RuleType.Rule)
      this.endRule(context, RuleType.Feature)
      this.build(context, token)
      return 41
    }
    if (this.match_Comment(context, token)) {
      this.build(context, token)
      return 39
    }
    if (this.match_TableRow(context, token)) {
      this.startRule(context, RuleType.ExamplesTable)
      this.build(context, token)
      return 40
    }
    if (this.match_TagLine(context, token)) {
      if (this.lookahead_0(context, token)) {
        this.endRule(context, RuleType.Examples)
        this.endRule(context, RuleType.ExamplesDefinition)
        this.startRule(context, RuleType.ExamplesDefinition)
        this.startRule(context, RuleType.Tags)
        this.build(context, token)
        return 36
      }
    }
    if (this.match_TagLine(context, token)) {
      this.endRule(context, RuleType.Examples)
      this.endRule(context, RuleType.ExamplesDefinition)
      this.endRule(context, RuleType.Scenario)
      this.endRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.Tags)
      this.build(context, token)
      return 30
    }
    if (this.match_ExamplesLine(context, token)) {
      this.endRule(context, RuleType.Examples)
      this.endRule(context, RuleType.ExamplesDefinition)
      this.startRule(context, RuleType.ExamplesDefinition)
      this.startRule(context, RuleType.Examples)
      this.build(context, token)
      return 37
    }
    if (this.match_ScenarioLine(context, token)) {
      this.endRule(context, RuleType.Examples)
      this.endRule(context, RuleType.ExamplesDefinition)
      this.endRule(context, RuleType.Scenario)
      this.endRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.Scenario)
      this.build(context, token)
      return 31
    }
    if (this.match_RuleLine(context, token)) {
      this.endRule(context, RuleType.Examples)
      this.endRule(context, RuleType.ExamplesDefinition)
      this.endRule(context, RuleType.Scenario)
      this.endRule(context, RuleType.ScenarioDefinition)
      this.endRule(context, RuleType.Rule)
      this.startRule(context, RuleType.Rule)
      this.startRule(context, RuleType.RuleHeader)
      this.build(context, token)
      return 22
    }
    if (this.match_Empty(context, token)) {
      this.build(context, token)
      return 39
    }

    const stateComment =
      'State: 39 - GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:3>ExamplesDefinition:1>Examples:1>DescriptionHelper:2>#Comment:0'
    token.detach()
    const expectedTokens = [
      '#EOF',
      '#Comment',
      '#TableRow',
      '#TagLine',
      '#ExamplesLine',
      '#ScenarioLine',
      '#RuleLine',
      '#Empty',
    ]
    const error = token.isEof
      ? UnexpectedEOFException.create(token, expectedTokens, stateComment)
      : UnexpectedTokenException.create(token, expectedTokens, stateComment)
    if (this.stopAtFirstError) {
      throw error
    }
    this.addError(context, error)
    return 39
  }

  // GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:3>ExamplesDefinition:1>Examples:2>ExamplesTable:0>#TableRow:0
  private matchTokenAt_40(token: Token, context: Context) {
    if (this.match_EOF(context, token)) {
      this.endRule(context, RuleType.ExamplesTable)
      this.endRule(context, RuleType.Examples)
      this.endRule(context, RuleType.ExamplesDefinition)
      this.endRule(context, RuleType.Scenario)
      this.endRule(context, RuleType.ScenarioDefinition)
      this.endRule(context, RuleType.Rule)
      this.endRule(context, RuleType.Feature)
      this.build(context, token)
      return 41
    }
    if (this.match_TableRow(context, token)) {
      this.build(context, token)
      return 40
    }
    if (this.match_TagLine(context, token)) {
      if (this.lookahead_0(context, token)) {
        this.endRule(context, RuleType.ExamplesTable)
        this.endRule(context, RuleType.Examples)
        this.endRule(context, RuleType.ExamplesDefinition)
        this.startRule(context, RuleType.ExamplesDefinition)
        this.startRule(context, RuleType.Tags)
        this.build(context, token)
        return 36
      }
    }
    if (this.match_TagLine(context, token)) {
      this.endRule(context, RuleType.ExamplesTable)
      this.endRule(context, RuleType.Examples)
      this.endRule(context, RuleType.ExamplesDefinition)
      this.endRule(context, RuleType.Scenario)
      this.endRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.Tags)
      this.build(context, token)
      return 30
    }
    if (this.match_ExamplesLine(context, token)) {
      this.endRule(context, RuleType.ExamplesTable)
      this.endRule(context, RuleType.Examples)
      this.endRule(context, RuleType.ExamplesDefinition)
      this.startRule(context, RuleType.ExamplesDefinition)
      this.startRule(context, RuleType.Examples)
      this.build(context, token)
      return 37
    }
    if (this.match_ScenarioLine(context, token)) {
      this.endRule(context, RuleType.ExamplesTable)
      this.endRule(context, RuleType.Examples)
      this.endRule(context, RuleType.ExamplesDefinition)
      this.endRule(context, RuleType.Scenario)
      this.endRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.Scenario)
      this.build(context, token)
      return 31
    }
    if (this.match_RuleLine(context, token)) {
      this.endRule(context, RuleType.ExamplesTable)
      this.endRule(context, RuleType.Examples)
      this.endRule(context, RuleType.ExamplesDefinition)
      this.endRule(context, RuleType.Scenario)
      this.endRule(context, RuleType.ScenarioDefinition)
      this.endRule(context, RuleType.Rule)
      this.startRule(context, RuleType.Rule)
      this.startRule(context, RuleType.RuleHeader)
      this.build(context, token)
      return 22
    }
    if (this.match_Comment(context, token)) {
      this.build(context, token)
      return 40
    }
    if (this.match_Empty(context, token)) {
      this.build(context, token)
      return 40
    }

    const stateComment =
      'State: 40 - GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:3>ExamplesDefinition:1>Examples:2>ExamplesTable:0>#TableRow:0'
    token.detach()
    const expectedTokens = [
      '#EOF',
      '#TableRow',
      '#TagLine',
      '#ExamplesLine',
      '#ScenarioLine',
      '#RuleLine',
      '#Comment',
      '#Empty',
    ]
    const error = token.isEof
      ? UnexpectedEOFException.create(token, expectedTokens, stateComment)
      : UnexpectedTokenException.create(token, expectedTokens, stateComment)
    if (this.stopAtFirstError) {
      throw error
    }
    this.addError(context, error)
    return 40
  }

  // GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:2>Step:1>StepArg:0>__alt0:1>DocString:0>#DocStringSeparator:0
  private matchTokenAt_42(token: Token, context: Context) {
    if (this.match_DocStringSeparator(context, token)) {
      this.build(context, token)
      return 43
    }
    if (this.match_Other(context, token)) {
      this.build(context, token)
      return 42
    }

    const stateComment =
      'State: 42 - GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:2>Step:1>StepArg:0>__alt0:1>DocString:0>#DocStringSeparator:0'
    token.detach()
    const expectedTokens = ['#DocStringSeparator', '#Other']
    const error = token.isEof
      ? UnexpectedEOFException.create(token, expectedTokens, stateComment)
      : UnexpectedTokenException.create(token, expectedTokens, stateComment)
    if (this.stopAtFirstError) {
      throw error
    }
    this.addError(context, error)
    return 42
  }

  // GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:2>Step:1>StepArg:0>__alt0:1>DocString:2>#DocStringSeparator:0
  private matchTokenAt_43(token: Token, context: Context) {
    if (this.match_EOF(context, token)) {
      this.endRule(context, RuleType.DocString)
      this.endRule(context, RuleType.Step)
      this.endRule(context, RuleType.Scenario)
      this.endRule(context, RuleType.ScenarioDefinition)
      this.endRule(context, RuleType.Rule)
      this.endRule(context, RuleType.Feature)
      this.build(context, token)
      return 41
    }
    if (this.match_StepLine(context, token)) {
      this.endRule(context, RuleType.DocString)
      this.endRule(context, RuleType.Step)
      this.startRule(context, RuleType.Step)
      this.build(context, token)
      return 34
    }
    if (this.match_TagLine(context, token)) {
      if (this.lookahead_0(context, token)) {
        this.endRule(context, RuleType.DocString)
        this.endRule(context, RuleType.Step)
        this.startRule(context, RuleType.ExamplesDefinition)
        this.startRule(context, RuleType.Tags)
        this.build(context, token)
        return 36
      }
    }
    if (this.match_TagLine(context, token)) {
      this.endRule(context, RuleType.DocString)
      this.endRule(context, RuleType.Step)
      this.endRule(context, RuleType.Scenario)
      this.endRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.Tags)
      this.build(context, token)
      return 30
    }
    if (this.match_ExamplesLine(context, token)) {
      this.endRule(context, RuleType.DocString)
      this.endRule(context, RuleType.Step)
      this.startRule(context, RuleType.ExamplesDefinition)
      this.startRule(context, RuleType.Examples)
      this.build(context, token)
      return 37
    }
    if (this.match_ScenarioLine(context, token)) {
      this.endRule(context, RuleType.DocString)
      this.endRule(context, RuleType.Step)
      this.endRule(context, RuleType.Scenario)
      this.endRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.Scenario)
      this.build(context, token)
      return 31
    }
    if (this.match_RuleLine(context, token)) {
      this.endRule(context, RuleType.DocString)
      this.endRule(context, RuleType.Step)
      this.endRule(context, RuleType.Scenario)
      this.endRule(context, RuleType.ScenarioDefinition)
      this.endRule(context, RuleType.Rule)
      this.startRule(context, RuleType.Rule)
      this.startRule(context, RuleType.RuleHeader)
      this.build(context, token)
      return 22
    }
    if (this.match_Comment(context, token)) {
      this.build(context, token)
      return 43
    }
    if (this.match_Empty(context, token)) {
      this.build(context, token)
      return 43
    }

    const stateComment =
      'State: 43 - GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:2>Step:1>StepArg:0>__alt0:1>DocString:2>#DocStringSeparator:0'
    token.detach()
    const expectedTokens = [
      '#EOF',
      '#StepLine',
      '#TagLine',
      '#ExamplesLine',
      '#ScenarioLine',
      '#RuleLine',
      '#Comment',
      '#Empty',
    ]
    const error = token.isEof
      ? UnexpectedEOFException.create(token, expectedTokens, stateComment)
      : UnexpectedTokenException.create(token, expectedTokens, stateComment)
    if (this.stopAtFirstError) {
      throw error
    }
    this.addError(context, error)
    return 43
  }

  // GherkinDocument:0>Feature:3>Rule:1>Background:2>Step:1>StepArg:0>__alt0:1>DocString:0>#DocStringSeparator:0
  private matchTokenAt_44(token: Token, context: Context) {
    if (this.match_DocStringSeparator(context, token)) {
      this.build(context, token)
      return 45
    }
    if (this.match_Other(context, token)) {
      this.build(context, token)
      return 44
    }

    const stateComment =
      'State: 44 - GherkinDocument:0>Feature:3>Rule:1>Background:2>Step:1>StepArg:0>__alt0:1>DocString:0>#DocStringSeparator:0'
    token.detach()
    const expectedTokens = ['#DocStringSeparator', '#Other']
    const error = token.isEof
      ? UnexpectedEOFException.create(token, expectedTokens, stateComment)
      : UnexpectedTokenException.create(token, expectedTokens, stateComment)
    if (this.stopAtFirstError) {
      throw error
    }
    this.addError(context, error)
    return 44
  }

  // GherkinDocument:0>Feature:3>Rule:1>Background:2>Step:1>StepArg:0>__alt0:1>DocString:2>#DocStringSeparator:0
  private matchTokenAt_45(token: Token, context: Context) {
    if (this.match_EOF(context, token)) {
      this.endRule(context, RuleType.DocString)
      this.endRule(context, RuleType.Step)
      this.endRule(context, RuleType.Background)
      this.endRule(context, RuleType.Rule)
      this.endRule(context, RuleType.Feature)
      this.build(context, token)
      return 41
    }
    if (this.match_StepLine(context, token)) {
      this.endRule(context, RuleType.DocString)
      this.endRule(context, RuleType.Step)
      this.startRule(context, RuleType.Step)
      this.build(context, token)
      return 28
    }
    if (this.match_TagLine(context, token)) {
      this.endRule(context, RuleType.DocString)
      this.endRule(context, RuleType.Step)
      this.endRule(context, RuleType.Background)
      this.startRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.Tags)
      this.build(context, token)
      return 30
    }
    if (this.match_ScenarioLine(context, token)) {
      this.endRule(context, RuleType.DocString)
      this.endRule(context, RuleType.Step)
      this.endRule(context, RuleType.Background)
      this.startRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.Scenario)
      this.build(context, token)
      return 31
    }
    if (this.match_RuleLine(context, token)) {
      this.endRule(context, RuleType.DocString)
      this.endRule(context, RuleType.Step)
      this.endRule(context, RuleType.Background)
      this.endRule(context, RuleType.Rule)
      this.startRule(context, RuleType.Rule)
      this.startRule(context, RuleType.RuleHeader)
      this.build(context, token)
      return 22
    }
    if (this.match_Comment(context, token)) {
      this.build(context, token)
      return 45
    }
    if (this.match_Empty(context, token)) {
      this.build(context, token)
      return 45
    }

    const stateComment =
      'State: 45 - GherkinDocument:0>Feature:3>Rule:1>Background:2>Step:1>StepArg:0>__alt0:1>DocString:2>#DocStringSeparator:0'
    token.detach()
    const expectedTokens = [
      '#EOF',
      '#StepLine',
      '#TagLine',
      '#ScenarioLine',
      '#RuleLine',
      '#Comment',
      '#Empty',
    ]
    const error = token.isEof
      ? UnexpectedEOFException.create(token, expectedTokens, stateComment)
      : UnexpectedTokenException.create(token, expectedTokens, stateComment)
    if (this.stopAtFirstError) {
      throw error
    }
    this.addError(context, error)
    return 45
  }

  // GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:2>Step:1>StepArg:0>__alt0:1>DocString:0>#DocStringSeparator:0
  private matchTokenAt_46(token: Token, context: Context) {
    if (this.match_DocStringSeparator(context, token)) {
      this.build(context, token)
      return 47
    }
    if (this.match_Other(context, token)) {
      this.build(context, token)
      return 46
    }

    const stateComment =
      'State: 46 - GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:2>Step:1>StepArg:0>__alt0:1>DocString:0>#DocStringSeparator:0'
    token.detach()
    const expectedTokens = ['#DocStringSeparator', '#Other']
    const error = token.isEof
      ? UnexpectedEOFException.create(token, expectedTokens, stateComment)
      : UnexpectedTokenException.create(token, expectedTokens, stateComment)
    if (this.stopAtFirstError) {
      throw error
    }
    this.addError(context, error)
    return 46
  }

  // GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:2>Step:1>StepArg:0>__alt0:1>DocString:2>#DocStringSeparator:0
  private matchTokenAt_47(token: Token, context: Context) {
    if (this.match_EOF(context, token)) {
      this.endRule(context, RuleType.DocString)
      this.endRule(context, RuleType.Step)
      this.endRule(context, RuleType.Scenario)
      this.endRule(context, RuleType.ScenarioDefinition)
      this.endRule(context, RuleType.Feature)
      this.build(context, token)
      return 41
    }
    if (this.match_StepLine(context, token)) {
      this.endRule(context, RuleType.DocString)
      this.endRule(context, RuleType.Step)
      this.startRule(context, RuleType.Step)
      this.build(context, token)
      return 15
    }
    if (this.match_TagLine(context, token)) {
      if (this.lookahead_0(context, token)) {
        this.endRule(context, RuleType.DocString)
        this.endRule(context, RuleType.Step)
        this.startRule(context, RuleType.ExamplesDefinition)
        this.startRule(context, RuleType.Tags)
        this.build(context, token)
        return 17
      }
    }
    if (this.match_TagLine(context, token)) {
      this.endRule(context, RuleType.DocString)
      this.endRule(context, RuleType.Step)
      this.endRule(context, RuleType.Scenario)
      this.endRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.Tags)
      this.build(context, token)
      return 11
    }
    if (this.match_ExamplesLine(context, token)) {
      this.endRule(context, RuleType.DocString)
      this.endRule(context, RuleType.Step)
      this.startRule(context, RuleType.ExamplesDefinition)
      this.startRule(context, RuleType.Examples)
      this.build(context, token)
      return 18
    }
    if (this.match_ScenarioLine(context, token)) {
      this.endRule(context, RuleType.DocString)
      this.endRule(context, RuleType.Step)
      this.endRule(context, RuleType.Scenario)
      this.endRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.Scenario)
      this.build(context, token)
      return 12
    }
    if (this.match_RuleLine(context, token)) {
      this.endRule(context, RuleType.DocString)
      this.endRule(context, RuleType.Step)
      this.endRule(context, RuleType.Scenario)
      this.endRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.Rule)
      this.startRule(context, RuleType.RuleHeader)
      this.build(context, token)
      return 22
    }
    if (this.match_Comment(context, token)) {
      this.build(context, token)
      return 47
    }
    if (this.match_Empty(context, token)) {
      this.build(context, token)
      return 47
    }

    const stateComment =
      'State: 47 - GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:2>Step:1>StepArg:0>__alt0:1>DocString:2>#DocStringSeparator:0'
    token.detach()
    const expectedTokens = [
      '#EOF',
      '#StepLine',
      '#TagLine',
      '#ExamplesLine',
      '#ScenarioLine',
      '#RuleLine',
      '#Comment',
      '#Empty',
    ]
    const error = token.isEof
      ? UnexpectedEOFException.create(token, expectedTokens, stateComment)
      : UnexpectedTokenException.create(token, expectedTokens, stateComment)
    if (this.stopAtFirstError) {
      throw error
    }
    this.addError(context, error)
    return 47
  }

  // GherkinDocument:0>Feature:1>Background:2>Step:1>StepArg:0>__alt0:1>DocString:0>#DocStringSeparator:0
  private matchTokenAt_48(token: Token, context: Context) {
    if (this.match_DocStringSeparator(context, token)) {
      this.build(context, token)
      return 49
    }
    if (this.match_Other(context, token)) {
      this.build(context, token)
      return 48
    }

    const stateComment =
      'State: 48 - GherkinDocument:0>Feature:1>Background:2>Step:1>StepArg:0>__alt0:1>DocString:0>#DocStringSeparator:0'
    token.detach()
    const expectedTokens = ['#DocStringSeparator', '#Other']
    const error = token.isEof
      ? UnexpectedEOFException.create(token, expectedTokens, stateComment)
      : UnexpectedTokenException.create(token, expectedTokens, stateComment)
    if (this.stopAtFirstError) {
      throw error
    }
    this.addError(context, error)
    return 48
  }

  // GherkinDocument:0>Feature:1>Background:2>Step:1>StepArg:0>__alt0:1>DocString:2>#DocStringSeparator:0
  private matchTokenAt_49(token: Token, context: Context) {
    if (this.match_EOF(context, token)) {
      this.endRule(context, RuleType.DocString)
      this.endRule(context, RuleType.Step)
      this.endRule(context, RuleType.Background)
      this.endRule(context, RuleType.Feature)
      this.build(context, token)
      return 41
    }
    if (this.match_StepLine(context, token)) {
      this.endRule(context, RuleType.DocString)
      this.endRule(context, RuleType.Step)
      this.startRule(context, RuleType.Step)
      this.build(context, token)
      return 9
    }
    if (this.match_TagLine(context, token)) {
      this.endRule(context, RuleType.DocString)
      this.endRule(context, RuleType.Step)
      this.endRule(context, RuleType.Background)
      this.startRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.Tags)
      this.build(context, token)
      return 11
    }
    if (this.match_ScenarioLine(context, token)) {
      this.endRule(context, RuleType.DocString)
      this.endRule(context, RuleType.Step)
      this.endRule(context, RuleType.Background)
      this.startRule(context, RuleType.ScenarioDefinition)
      this.startRule(context, RuleType.Scenario)
      this.build(context, token)
      return 12
    }
    if (this.match_RuleLine(context, token)) {
      this.endRule(context, RuleType.DocString)
      this.endRule(context, RuleType.Step)
      this.endRule(context, RuleType.Background)
      this.startRule(context, RuleType.Rule)
      this.startRule(context, RuleType.RuleHeader)
      this.build(context, token)
      return 22
    }
    if (this.match_Comment(context, token)) {
      this.build(context, token)
      return 49
    }
    if (this.match_Empty(context, token)) {
      this.build(context, token)
      return 49
    }

    const stateComment =
      'State: 49 - GherkinDocument:0>Feature:1>Background:2>Step:1>StepArg:0>__alt0:1>DocString:2>#DocStringSeparator:0'
    token.detach()
    const expectedTokens = [
      '#EOF',
      '#StepLine',
      '#TagLine',
      '#ScenarioLine',
      '#RuleLine',
      '#Comment',
      '#Empty',
    ]
    const error = token.isEof
      ? UnexpectedEOFException.create(token, expectedTokens, stateComment)
      : UnexpectedTokenException.create(token, expectedTokens, stateComment)
    if (this.stopAtFirstError) {
      throw error
    }
    this.addError(context, error)
    return 49
  }

  private match_EOF(context: Context, token: Token) {
    return this.handleExternalError(context, false, () =>
      context.tokenMatcher.match_EOF(token)
    )
  }

  private match_Empty(context: Context, token: Token) {
    if (token.isEof) {
      return false
    }
    return this.handleExternalError(context, false, () =>
      context.tokenMatcher.match_Empty(token)
    )
  }

  private match_Comment(context: Context, token: Token) {
    if (token.isEof) {
      return false
    }
    return this.handleExternalError(context, false, () =>
      context.tokenMatcher.match_Comment(token)
    )
  }

  private match_TagLine(context: Context, token: Token) {
    if (token.isEof) {
      return false
    }
    return this.handleExternalError(context, false, () =>
      context.tokenMatcher.match_TagLine(token)
    )
  }

  private match_FeatureLine(context: Context, token: Token) {
    if (token.isEof) {
      return false
    }
    return this.handleExternalError(context, false, () =>
      context.tokenMatcher.match_FeatureLine(token)
    )
  }

  private match_RuleLine(context: Context, token: Token) {
    if (token.isEof) {
      return false
    }
    return this.handleExternalError(context, false, () =>
      context.tokenMatcher.match_RuleLine(token)
    )
  }

  private match_BackgroundLine(context: Context, token: Token) {
    if (token.isEof) {
      return false
    }
    return this.handleExternalError(context, false, () =>
      context.tokenMatcher.match_BackgroundLine(token)
    )
  }

  private match_ScenarioLine(context: Context, token: Token) {
    if (token.isEof) {
      return false
    }
    return this.handleExternalError(context, false, () =>
      context.tokenMatcher.match_ScenarioLine(token)
    )
  }

  private match_ExamplesLine(context: Context, token: Token) {
    if (token.isEof) {
      return false
    }
    return this.handleExternalError(context, false, () =>
      context.tokenMatcher.match_ExamplesLine(token)
    )
  }

  private match_StepLine(context: Context, token: Token) {
    if (token.isEof) {
      return false
    }
    return this.handleExternalError(context, false, () =>
      context.tokenMatcher.match_StepLine(token)
    )
  }

  private match_DocStringSeparator(context: Context, token: Token) {
    if (token.isEof) {
      return false
    }
    return this.handleExternalError(context, false, () =>
      context.tokenMatcher.match_DocStringSeparator(token)
    )
  }

  private match_TableRow(context: Context, token: Token) {
    if (token.isEof) {
      return false
    }
    return this.handleExternalError(context, false, () =>
      context.tokenMatcher.match_TableRow(token)
    )
  }

  private match_Language(context: Context, token: Token) {
    if (token.isEof) {
      return false
    }
    return this.handleExternalError(context, false, () =>
      context.tokenMatcher.match_Language(token)
    )
  }

  private match_Other(context: Context, token: Token) {
    if (token.isEof) {
      return false
    }
    return this.handleExternalError(context, false, () =>
      context.tokenMatcher.match_Other(token)
    )
  }

  private lookahead_0(context: Context, currentToken: Token) {
    currentToken.detach()
    let token
    const queue: Token[] = []
    let match = false
    do {
      token = this.readToken(this.context)
      token.detach()
      queue.push(token)

      if (false || this.match_ExamplesLine(context, token)) {
        match = true
        break
      }
    } while (
      false ||
      this.match_Empty(context, token) ||
      this.match_Comment(context, token) ||
      this.match_TagLine(context, token)
    )

    context.tokenQueue = context.tokenQueue.concat(queue)

    return match
  }
}